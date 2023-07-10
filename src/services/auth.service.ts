import User from "../models/User.model";

import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";


export const signupService = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const isEmailExit = await User.findOne({ email: new RegExp(`^${req.body.email}$`, "i") });
    if (isEmailExit) {
      return res.status(400).json({ message: "already exist" });
    }
    const newUser = new User({ ...req.body });
    const user = await newUser.save();

    return res.status(201).json({ data: user });

  } catch (error) {
    return next(createHttpError(400, "somethind went wrong"));
  }
};


export const loginService = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne(
      { email: new RegExp(`^${email}$`, "i") })
      .select("+password")
      .exec();

    if (!user) {
      return res.status(401).json({ message: "user does not exist" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "password isn't correct" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};
