import mongoose from "mongoose";

// o campo "description" será um documento aninhado
// const descriptionSchema = new mongoose.Schema({
//    String,
//  String,
//     hair_color: String,
//     skiString,
//     eye_color: String,
//     gender: String,

// })

const starshipSchema = new mongoose.Schema({
  name: String,
  model: String,
  manufacturer: String,
  cost_in_credits: Number,
  length: Number,
  max_atmosphering_speed: Number,
  crew: String,
  passengers: Number,
  cargo_capacity: Number,
  consumables: String,
  hyperdrive_rating: Number,
  MGLT: Number,
  starship_class: String,
});

const Starship = mongoose.model("Starship", starshipSchema);

export default starshipSchema;
