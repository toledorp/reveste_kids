import mongoose from "mongoose";
import dotenv from "dotenv";
import Person from "../models/Persons.js";
import Planet from "../models/Planets.js";
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

async function fetchAllPeople() {
  let url = "https://swapi.dev/api/people/";
  const allPeople = [];

  while (url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar pessoas: ${response.status}`);
    }

    const data = await response.json();
    allPeople.push(...data.results);
    url = data.next;
  }

  return allPeople;
}

async function seedPersons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao MongoDB");

    const people = await fetchAllPeople();

    const humanSpecie = await Specie.findOne({ name: "Human" });

    if (!humanSpecie) {
      throw new Error('Espécie "Human" não encontrada. Rode o seed de species antes.');
    }

    const formattedPeople = [];

    for (const person of people) {
      const personSwapiId = extractSwapiId(person.url);
      const planetSwapiId = extractSwapiId(person.homeworld);

      const localPlanet = planetSwapiId
        ? await Planet.findOne({ swapi_id: planetSwapiId })
        : null;

      let localSpecie = null;

      if (Array.isArray(person.species) && person.species.length > 0) {
        const speciesSwapiId = extractSwapiId(person.species[0]);

        localSpecie = speciesSwapiId
          ? await Specie.findOne({ swapi_id: speciesSwapiId })
          : null;
      } else {
        localSpecie = humanSpecie;
      }

      formattedPeople.push({
        swapi_id: personSwapiId,
        name: person.name,
        birth_year: person.birth_year,
        homeworld: localPlanet ? localPlanet._id : null,
        species: localSpecie ? localSpecie._id : humanSpecie._id,
        descriptions: {
          height: toNumber(person.height),
          mass: toNumber(person.mass),
          hair_color: person.hair_color,
          skin_color: person.skin_color,
          eye_color: person.eye_color,
          gender: person.gender,
        },
      });
    }

    await Person.deleteMany({});
    await Person.insertMany(formattedPeople);

    console.log(`Pessoas inseridas com sucesso: ${formattedPeople.length}`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Erro no seed de persons:", error);
    await mongoose.disconnect();
  }
}

seedPersons();