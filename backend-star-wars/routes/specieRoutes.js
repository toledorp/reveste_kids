import express from 'express';
import specieController from '../controllers/specieController.js'
const specieRoutes = express.Router()

//importando o middleware de autenticação. Obs so se import i middleware na rota de consumo
import Auth from '../middleware/Auth.js'

// na camada de route é armazenado os endpoints (url) da API

// Endpoit para lista todos os veículo
specieRoutes.get("/species",Auth.Authorization, specieController.getAllSpecies)

// Endpoint para Cadastrar / Criar um veículo
specieRoutes.post("/species", Auth.Authorization, specieController.createSpecie)

// Endpoint para deletar um veículo
specieRoutes.delete("/species/:id", Auth.Authorization, specieController.deleteSpecie)

// Endpoint para atualizar um veículo
specieRoutes.put("/species/:id", Auth.Authorization, specieController.updateSpecie)

// Endpoint para consultar um unico veículo
specieRoutes.get("/species/:id", Auth.Authorization, specieController.getOneSpecie)

export default specieRoutes;

