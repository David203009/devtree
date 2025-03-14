import { Router } from "express";

//for validate input form
import { body } from 'express-validator';
import { createAccount } from "./handlers/index";

const router = Router();

/** Autentication and registries */
router.post("/auth/register", 
    body('handle').notEmpty(),
    createAccount);


export default router;
