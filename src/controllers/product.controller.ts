import { getProductsSevice, createProductService } from "../services/prodcut.service";

import { NextFunction, Request, Response } from "express";


export const getProducts = (
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> => getProductsSevice(req, res, next);


export const createProducts = (
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> => createProductService(req, res, next);
