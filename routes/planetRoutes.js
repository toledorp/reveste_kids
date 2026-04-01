import express from 'express';
import planetController from '../controllers/planetController.js'
const planetRoutes = express.Router()

//importando o middleware de autenticação. Obs so se import i middleware na rota de consumi
import Auth from '../middleware/Auth.js'

// na camada de route é armazenado os endpoints (url) da API

// Endpoit para lista todos os planetas
planetRoutes.get("/planets",Auth.Authorization, planetController.getAllPlanets)

// Endpoint para Cadastrar / Criar um planeta
planetRoutes.post("/planets", Auth.Authorization, planetController.createPlanet)

// Endpoint para deletar um planeta
planetRoutes.delete("/planets/:id", Auth.Authorization, planetController.deletePlanet)

// Endpoint para atualizar um planeta
planetRoutes.put("/planets/:id", Auth.Authorization, planetController.updatePlanet)

// Endpoint para consultar um unico planeta
planetRoutes.get("/planets/:id", Auth.Authorization, planetController.getOnePlanet)

export default planetRoutes;

