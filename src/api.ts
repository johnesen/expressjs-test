import authRoutes from "./routes/auth.route";

import express from "express";


const router = express.Router();

router.use("/auth", authRoutes);

export default router;
