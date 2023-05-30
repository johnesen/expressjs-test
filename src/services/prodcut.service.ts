import Product from "../models/Product.model";

import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";


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

export const getProductsSevice = async (
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> => {
  try {
    const product = await Product.find();
    return res.status(200).json(product);
  } catch (error) {
    next(createHttpError(400, "somethe went wrong"));
  }
};
