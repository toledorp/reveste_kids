import mongoose from "mongoose";

// o campo "description" será um documento aninhado
const descriptionSchema = new mongoose.Schema({
    genre: String,
    platform: String,
    rating: String,

})

const gameSchema = new mongoose.Schema({
    title: String,
    year: Number,
    price: Number,
    descriptions: descriptionSchema // caso quisesse fazer um arrey [descriptionSchema]
});

const Game = mongoose.model('Game', gameSchema)

export default Game;