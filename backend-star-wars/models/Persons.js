import mongoose from "mongoose";

// o campo "description" será um documento aninhado
const descriptionSchema = new mongoose.Schema({
    height: Number,
    mass: Number,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    gender: String,

})

const personSchema = new mongoose.Schema({
    name: String,
    birth_year: String,
    homeworld: String,
    species: String,
    descriptions: descriptionSchema // caso quisesse fazer um arrey [descriptionSchema]
});

const Person = mongoose.model('Person', personSchema)

export default Person;