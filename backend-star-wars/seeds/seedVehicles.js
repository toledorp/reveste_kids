import mongoose from "mongoose";
import dotenv from "dotenv";
import Vehicle from "../models/Vehicles.js";

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

async function fetchAllVehicles() {
  let url = "https://swapi.dev/api/vehicles/";
  const allVehicles = [];

  while (url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar vehicles: ${response.status}`);
    }

    const data = await response.json();
    allVehicles.push(...data.results);
    url = data.next;
  }

  return allVehicles;
}

async function seedVehicles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao MongoDB");

    const vehicles = await fetchAllVehicles();

    const formattedVehicles = vehicles.map((vehicle) => ({
      name: vehicle.name,
      model: vehicle.model,
      manufacturer: vehicle.manufacturer,
      cost_in_credits: toNumber(vehicle.cost_in_credits),
      length: toNumber(vehicle.length),
      max_atmosphering_speed: toNumber(vehicle.max_atmosphering_speed),
      crew: toNumber(vehicle.crew),
      passengers: toNumber(vehicle.passengers),
      cargo_capacity: toNumber(vehicle.cargo_capacity),
      consumables: vehicle.consumables,
      vehicle_class: vehicle.vehicle_class,
    }));

    await Vehicle.deleteMany({});
    await Vehicle.insertMany(formattedVehicles);

    console.log(`Vehicles inseridos com sucesso: ${formattedVehicles.length}`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Erro no seed de vehicles:", error);
    await mongoose.disconnect();
  }
}

seedVehicles();