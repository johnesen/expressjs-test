import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";


const authorize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      next(createHttpError(401, "user not authenticated"));
      return;
    }
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.body.user = decoded;
    next();
  } catch (err) {
    next(createHttpError(403, "toekn not valid"));
  }
};

export default authorize;
