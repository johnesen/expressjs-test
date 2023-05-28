import { loginService, signupService } from "../services/auth.service";

import { Request, Response, NextFunction } from "express";


export const signUpController = (
  req: Request, res: Response, next: NextFunction,
): any => signupService(req, res, next);


export const loginController = (
  req: Request, res: Response, next: NextFunction,
): any => loginService(req, res, next);
