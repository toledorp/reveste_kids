import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    name: String,
    model: String,
    manufacturer: String,
    cost_in_credits: Number,
    length: Number, 
    max_atmosphering_speed: Number,
    crew: Number,
    passengers: Number,
    cargo_capacity: Number,
    consumables: String,
    vehicle_class: String
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

export default Vehicle;