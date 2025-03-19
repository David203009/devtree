import { Router } from "express";

//for validate input form
import { body } from 'express-validator';
import { createAccount, login } from "./handlers/index";

//midleware for validations
import { handleInputErrors } from './middleware/validation';

const router = Router();

/** Autentication and registries */
router.post("/auth/register", 
    body('handle').notEmpty().withMessage("El handle no puede ir vacio"),
    body('name').notEmpty().withMessage("El nombre no puede ir vacio"),
    body('email').isEmail().withMessage("El email no es valido"),
    body('password').isLength({min: 8}).withMessage("El password no puede ser menor que 8 caracteres"),
    handleInputErrors,
    createAccount
);

router.post('/auth/login', 
    body('email').isEmail().withMessage("El email no es valido"),
    body('password').notEmpty().withMessage("El password es obligatorio"),
    handleInputErrors,
    login
);


export default router;
