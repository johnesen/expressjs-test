import { notFoundMiddleware } from "./middlewares/notFound.js";
import api from "./api.js";
import adminRouter, { adminJS } from "./admin.js";


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";


dotenv.config();
const app: express.Application = express();
const swaggerDocument = YAML.load(`${process.cwd()}/swagger/swagger.yaml`);


app.use(adminJS.options.rootPath, adminRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/static", express.static("public"));

app.use("/api", api);
app.use(cors());
app.use(notFoundMiddleware);


export default app;
