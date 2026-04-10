import mongoose from "mongoose";

const planetSchema = new mongoose.Schema({
  swapi_id: Number,
  name: String,
  rotation_period: Number,
  orbital_period: Number,
  diameter: Number,
  climate: String,
  gravity: String,
  terrain: String,
  surface_water: Number,
  population: Number,
});

const Planet = mongoose.model("Planet", planetSchema);

export default Planet;