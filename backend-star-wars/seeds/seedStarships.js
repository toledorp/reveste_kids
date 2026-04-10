import mongoose from "mongoose";
import dotenv from "dotenv";
import Starship from "../models/Starships.js";

dotenv.config();

function toNumber(value) {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "unknown" ||
    value === "n/a" ||
    value === "none"
  ) {
    return null;
  }

  const normalized = String(value).replace(/,/g, "");
  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? null : parsed;
}

async function fetchAllStarships() {
  let url = "https://swapi.dev/api/starships/";
  const allStarships = [];

  while (url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar starships: ${response.status}`);
    }

    const data = await response.json();
    allStarships.push(...data.results);
    url = data.next;
  }

  return allStarships;
}

async function seedStarships() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao MongoDB");

    const starships = await fetchAllStarships();

    const formattedStarships = starships.map((starship) => ({
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      cost_in_credits: toNumber(starship.cost_in_credits),
      length: toNumber(starship.length),
      max_atmosphering_speed: toNumber(starship.max_atmosphering_speed),
      crew: starship.crew,
      passengers: toNumber(starship.passengers),
      cargo_capacity: toNumber(starship.cargo_capacity),
      consumables: starship.consumables,
      hyperdrive_rating: toNumber(starship.hyperdrive_rating),
      MGLT: toNumber(starship.MGLT),
      starship_class: starship.starship_class,
    }));

    await Starship.deleteMany({});
    await Starship.insertMany(formattedStarships);

    console.log(`Starships inseridas com sucesso: ${formattedStarships.length}`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Erro no seed de starships:", error);
    await mongoose.disconnect();
  }
}

seedStarships();