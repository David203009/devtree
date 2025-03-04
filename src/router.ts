import { Router } from "express";

const router = Router();

/** Autentication and registries */
router.post("/auth/register", (req, res) => {
  console.log(req.body);
});

export default router;
