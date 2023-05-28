import { notFoundMiddleware } from "./middlewares/notFound";
import api from "./api";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";


dotenv.config();

const app: express.Application = express();
const swaggerDocument = YAML.load(`${process.cwd()}/swagger/swagger.yaml`);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/static", express.static("public"));

app.use("/api", api);
app.use(notFoundMiddleware);


export default app;
