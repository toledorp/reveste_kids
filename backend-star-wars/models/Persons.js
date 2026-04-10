import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema({
  height: Number,
  mass: Number,
  hair_color: String,
  skin_color: String,
  eye_color: String,
  gender: String,
});

const personSchema = new mongoose.Schema({
  swapi_id: Number,
  name: String,
  birth_year: String,
  homeworld: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Planet",
  },
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specie",
  },
  descriptions: descriptionSchema,
});

const Person = mongoose.model("Person", personSchema);

export default Person;