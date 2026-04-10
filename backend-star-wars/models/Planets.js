import mongoose from "mongoose";

const planetSchema = new mongoose.Schema({
    name: String,
    rotation_period: Number,
    orbital_period: Number,
    diameter: Number,
    climate: String,
    gravity: String,
    terrain: String,
    suface_water: Number,
    population: Number
    
    // caso quisesse fazer um arrey [descriptionSchema]
    // descriptions: descriptionSchema 
    

});

const Planet = mongoose.model('Planet', planetSchema)

export default Planet;