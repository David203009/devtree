import { Request, Response } from "express";

//for validations
import { validationResult } from 'express-validator';

// slug for create user names without spaces and upper
import slugify from 'slugify'
import User from "../models/User";
import { hashPassword, checkPassword } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {
    try {

        //manage errors
        let errors = validationResult(req);

        if(!errors.isEmpty()){
          res.status(400).send({errors: errors.array()});
          return;
        }

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
    let errors =  validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send({errors: errors.array()});
        return;
    }

    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        res.status(404).send({error: 'El usuario no existe'})
    }

    const isPassCorect = checkPassword(password, user.password)
    if(!isPassCorect){
        res.status(401).send({error: 'Password incorrecto'})
        return;
    }

    res.send('Autenticado.....')

}
