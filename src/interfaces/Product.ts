import { Document, Types } from "mongoose";


export interface IProduct extends Document{
  title: string,
  descriptoin: string,
  photo: string,
  createdAt?: string
  userId: Types.ObjectId
}
