import { Request, Response } from "express";

//for validations
import { validationResult } from 'express-validator';

// slug for create user names without spaces and upper
import slug from 'slug'
import User from "../models/User";
import { hashPassword } from '../utils/auth'

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

        const handle = slug(req.body.handle, '');
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
