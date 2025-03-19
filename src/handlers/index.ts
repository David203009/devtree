import { Request, Response } from "express";

// slug for create user names without spaces and upper
import slugify from 'slugify'
import User from "../models/User";
import { hashPassword, checkPassword } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {
    try {

        const {email, password} = req.body;
    
        const userExists = await User.findOne({email});

        if (userExists) {
            res.status(409).send({message: 'User already exists'});
            return;
        }

        const handle = slugify(req.body.handle, '');
        const handleExists = await User.findOne({handle});

        if(handleExists){
            res.status(409).send({message: 'Handle already exists'});
            return;
        }

        const user = new User(req.body);
        user.password = await hashPassword(user.password);
        user.handle = handle;

        await user.save();
        res.status(200).send({message: 'User created'});
        return;
    } catch (error) {
        res.status(500).send({message: 'Error creating user', error: error});
        return;  
    }
}

export const login = async (req: Request, res: Response) => {

    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        res.status(404).send({error: 'El usuario no existe'})
        return;
    }

    const isPassCorrect = await checkPassword(password, user.password)
    if(!isPassCorrect){
        res.status(401).send({error: 'Password incorrecto'})
        return;
    }

    res.send('Autenticado.....')

}
