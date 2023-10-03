import { createProducts, getProducts } from "../controllers/product.controller.js";
import authorize from "../middlewares/auth.js";
import express from "express";


const router = express.Router();

router.get("/", authorize, getProducts);
router.post("/create", authorize, createProducts);

export default router;
