import Product from "../models/Product.model";

import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";


export const createProductService = async (
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> => {
  try {
    const { title, description, photo } = req.body;
    const product = new Product(
      {
        title: title,
        descriptoin: description,
        photo: photo,
        userId: req.body.user._id,
      });
    product.save();
    return res.status(201).json({ data: product });
  } catch (error) {
    next(createHttpError(400, "something went wrong"));
  }
};

export const getProductsSevice = async (
  req: Request, res: Response,
): Promise<Response | void> => {
  const product = await Product.find({ userId: req.body.user._id }).exec();
  return res.status(200).json(product);
};
