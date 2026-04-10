import mongoose from "mongoose";
import dotenv from "dotenv";
import Planet from "../models/Planets.js";

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

async function fetchAllPlanets() {
  let url = "https://swapi.dev/api/planets/";
  const allPlanets = [];

  while (url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar planetas: ${response.status}`);
    }

    const data = await response.json();
    allPlanets.push(...data.results);
    url = data.next;
  }

  return allPlanets;
}

async function seedPlanets() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao MongoDB");

    const planets = await fetchAllPlanets();

    const formattedPlanets = planets.map((planet) => ({
      swapi_id: extractSwapiId(planet.url),
      name: planet.name,
      rotation_period: toNumber(planet.rotation_period),
      orbital_period: toNumber(planet.orbital_period),
      diameter: toNumber(planet.diameter),
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surface_water: toNumber(planet.surface_water),
      population: toNumber(planet.population),
    }));

    await Planet.deleteMany({});
    await Planet.insertMany(formattedPlanets);

    console.log(`Planetas inseridos com sucesso: ${formattedPlanets.length}`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Erro no seed de planets:", error);
    await mongoose.disconnect();
  }
}

seedPlanets();