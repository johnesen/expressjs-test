import { Schema, Types, model } from "mongoose";


export const ProductSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      required: true,
      maxLenght: [ 100, "title cant be greater tha 100" ],
    },
    descriptoin: {
      type: String,
      lowercase: true,
      required: true,
      maxLenght: [ 500, "title cant be greater tha 500" ],
    },
    photo: {
      type: String,
      required: false,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
);
export default model("Product", ProductSchema);
