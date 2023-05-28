import { loginController, signUpController } from "../controllers/auth.controller";
import express from "express";


const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signUpController);

export = router
