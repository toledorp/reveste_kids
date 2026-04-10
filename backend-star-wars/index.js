import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import filmRoutes from "./routes/filmRoutes.js";
import personRoutes from "./routes/personRoutes.js";
import planetRoutes from "./routes/planetRoutes.js";
import specieRoutes from "./routes/specieRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import starshipRoutes from "./routes/starshipRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", filmRoutes);
app.use("/", personRoutes);
app.use("/", planetRoutes);
app.use("/", specieRoutes);
app.use("/", vehicleRoutes);
app.use("/", starshipRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
    app.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Erro ao conectar:", error);
  });