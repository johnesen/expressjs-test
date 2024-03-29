/* eslint-disable no-restricted-syntax */
import { authorizationRoles } from "../constants/auth.js";
import { IUser } from "../interfaces/User.js";

import bcrypt from "bcrypt";
import { Document, Schema, model } from "mongoose";


export interface IUserDocument extends Document, IUser {
  comparePassword: (password: string) => Promise<boolean>;
}

export const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [ true, "please provide name" ],
      minlength: [ 3, "name cant be smaller than 3 characters" ],
      maxlength: [ 25, "name can be greater than 25 characters" ],
    },
    surname: {
      type: String,
      trim: true,
      lowercase: true,
      required: [ true, "Please provide surname" ],
      minLength: [ 3, "Surname can't be smaller than 3 characters" ],
      maxLength: [ 15, "Surname can't be greater than 15 characters" ],
    },
    email: {
      type: String,
      required: [ true, "Please provide email" ],
      unique: false,
      trim: true,
      lowercase: true,
      maxLength: [ 128, "Email can't be greater than 128 characters" ],
      index: false,
    },
    password: {
      type: String,
      required: [ true, "Please provide password" ],
      minlength: [ 6, "Password must be more than 6 characters" ],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      trim: true,
      lowercase: true,
      enum: [
        authorizationRoles.user,
        authorizationRoles.admin,
        authorizationRoles.moderator,
      ],
      default: authorizationRoles.user,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
);

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;

};

UserSchema.pre("save", async function (next) {
  if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    console.log("Middleware called before saving the user is", this);
  }

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.post("save", function () {
  if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    console.log("Middleware called after saving the user is (User is been Save )", this);
  }
});

const User = model<IUserDocument>("User", UserSchema);

export default User;
