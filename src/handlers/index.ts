import { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
    try {
        const {email} = req.body;
        const userExists = await User.findOne({email});

        if (userExists) {
            return res.send({message: 'User already exists'});
        }

        const user = new User(req.body);
        await user.save();
        res.send({message: 'User created'});
    } catch (error) {
        res.send({message: 'Error creating user'});
    }
}