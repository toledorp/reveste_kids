import express from "express";

//importando o mongoose
import mongoose from "mongoose";

//importando o model
import Film from "./models/Films.js";
import Person from "./models/Persons.js";
import Planet from "./models/Planets.js";
import Specie from "./models/Species.js";
import Vehicle from "./models/Vehicles.js";
import Starship from "./models/Starships.js"

//importando o model de usuario
import User from "./models/Users.js";

//importando as rotas(Routes)
import filmRoutes from "./routes/filmRoutes.js";
import personRoutes from "./routes/personRoutes.js";
import planetRoutes from "./routes/planetRoutes.js";
import specieRoutes from "./routes/specieRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import starshipRoutes from "./routes/starshipRoutes.js"; 


//Importando o cors
import cors from "cors";

//Importando as ROtas de Usuarios
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Configurações do express
app.use(express.json()); // permite o uso de json na aplicão

//Configurando o CORS
app.use(cors());

//Ativando a utilização das rotas
app.use("/", userRoutes);
app.use("/", filmRoutes);
app.use("/", personRoutes);
app.use("/", planetRoutes);
app.use("/", specieRoutes);
app.use("/", vehicleRoutes);
app.use("/", starshipRoutes);

//iniciando a conexão com o banco mongodb
mongoose.connect("mongodb://127.0.0.1:27017/starwars");

// Rodando a api na port 4000
const port = 4000;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`API rodando em http://localhost:${port}`);
  }
});
