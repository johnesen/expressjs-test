import { createProducts, getProducts } from "../controllers/product.controller";
import express from "express";


const router = express.Router();

router.get("/", getProducts);
router.post("/create", createProducts);

export = router
