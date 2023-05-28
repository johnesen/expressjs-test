import { Document } from "mongoose";


export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  role?: string;
  acceptTerms: boolean;
  mobileNumber?: string;
  bio?: string;
  status?: string;
  isVerified?: boolean;
  isDeleted?: boolean;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  timestamps?: boolean;
}
