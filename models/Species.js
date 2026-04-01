import mongoose from "mongoose";

const specieSchema = new mongoose.Schema({
  name: String,
  classification: String,
  designation: String,
  average_height: Number,
  skin_colors: String,
  hair_colors: String,
  eye_colors: String,
  average_lifespan: Number,
  language: String,
});

const Specie = mongoose.model("Specie", specieSchema);

export default Specie;
