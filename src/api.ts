import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

import express from "express";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);

export default router;
