import mongoose from "mongoose";
import dotenv from "dotenv";
import Film from "../models/Films.js";

dotenv.config();

async function seedFilms() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao MongoDB");

    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const films = data.results.map((film) => ({
      title: film.title,
      episode_id: Number(film.episode_id),
      opening_crawl: film.opening_crawl,
      director: film.director,
      release_date: film.release_date,
    }));

    // limpa antes de inserir (opcional)
    await Film.deleteMany();

    await Film.insertMany(films);

    console.log("🔥 Filmes inseridos com sucesso!");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Erro no seed:", error);
  }
}

seedFilms();