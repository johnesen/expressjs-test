import authRoutes from "./routes/auth.route";
import productRoutes from "./routes/product.route";

import express from "express";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);

export default router;
