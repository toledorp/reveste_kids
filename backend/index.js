import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./swagger.js";

import userRoutes from "./routes/userRoutes.js";
import clothingRoutes from "./routes/clothingRoutes.js";
import interestRoutes from "./routes/interestRoutes.js";



dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", userRoutes);
app.use("/", clothingRoutes);
app.use("/api", interestRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
    app.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
      console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
    });
  })
  .catch((error) => {
    console.log("Erro ao conectar:", error);
  });