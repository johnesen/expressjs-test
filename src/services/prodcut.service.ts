import Product from "../models/Product.model";

import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";


export const createProductService = async (
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> => {
  try {
    const { title, description, photo, userId } = req.body;
    const product = new Product(
      {
        title: title,
        descriptoin: description,
        photo: photo,
        userId: userId,
      });
    product.save();
    return res.status(201).json({ data: product });
  } catch (error) {
    next(createHttpError(400, "somethe went wrong"));
  }
};

export interface CustomRequest extends Request {
  token: string | JwtPayload
  userId: string
 }

export const getProductsSevice = async (
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      next(createHttpError(401, "user not authenticated"));
      return;
    }
    const decoded = jwt.verify(token, "SECRET_KEY");

    if (typeof(decoded) !== "object") {
      next(createHttpError(403, "Token not valid"));
      return;
    }
    // (req as CustomRequest).token = decoded;

    const product = await Product.find({ userId: decoded._id }).exec();
    return res.status(200).json(product);

  } catch (err) {
    next(createHttpError(400, "error"));
  }
};
