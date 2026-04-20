import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    title: String,
    episode_id: Number,
    opening_crawl: String,
    director: String,
    release_date: String, 
});

const Film = mongoose.model('Film', filmSchema)

export default Film;