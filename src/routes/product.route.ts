import { createProducts, getProducts } from "../controllers/product.controller";
import authorize from "../middlewares/auth";
import express from "express";


const router = express.Router();

router.get("/", authorize, getProducts);
router.post("/create", authorize, createProducts);

export = router
