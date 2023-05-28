import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";


export function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.status(404).send("Not Found");
  next(createHttpError(404, `Route - ${req.originalUrl}  Not Found`));
}

export default notFoundMiddleware;
