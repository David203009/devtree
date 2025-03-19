import { Request, Response, NextFunction } from 'express';
//for validations
import { validationResult } from 'express-validator';

export const handleInputErrors = (req : Request, res : Response, next : NextFunction) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send({errors: errors.array()});
        return;
    }
    next();
}