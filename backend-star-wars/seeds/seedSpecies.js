import mongoose from "mongoose";
import dotenv from "dotenv";
import Specie from "../models/Species.js";

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

function extractSwapiId(url) {
  if (!url) return null;
  const match = url.match(/\/(\d+)\/$/);
  return match ? Number(match[1]) : null;
}

async function fetchAllSpecies() {
  let url = "https://swapi.dev/api/species/";
  const allSpecies = [];

  while (url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar species: ${response.status}`);
    }

    const data = await response.json();
    allSpecies.push(...data.results);
    url = data.next;
  }

  return allSpecies;
}

async function seedSpecies() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao MongoDB");

    const species = await fetchAllSpecies();

    const formattedSpecies = species.map((specie) => ({
      swapi_id: extractSwapiId(specie.url),
      name: specie.name,
      classification: specie.classification,
      designation: specie.designation,
      average_height: toNumber(specie.average_height),
      skin_colors: specie.skin_colors,
      hair_colors: specie.hair_colors,
      eye_colors: specie.eye_colors,
      average_lifespan: toNumber(specie.average_lifespan),
      language: specie.language,
    }));

    await Specie.deleteMany({});
    await Specie.insertMany(formattedSpecies);

    console.log(`Species inseridas com sucesso: ${formattedSpecies.length}`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Erro no seed de species:", error);
    await mongoose.disconnect();
  }
}

seedSpecies();