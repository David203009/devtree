import { Router } from "express";
import { createAccount } from "./handlers/index";

const router = Router();

/** Autentication and registries */
router.post("/auth/register", createAccount);


export default router;
