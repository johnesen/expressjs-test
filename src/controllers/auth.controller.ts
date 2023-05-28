import { loginService, signupService } from "../services/auth.service";

import { Request, Response, NextFunction } from "express";


export const signUpController = (
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> => signupService(req, res, next);


export const loginController = (
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> => loginService(req, res, next);
