import express from 'express';
import starshipController from '../controllers/starshipController.js'
const starshipRoutes = express.Router()

//importando o middleware de autenticação. Obs so se import i middleware na rota de consumo
import Auth from '../middleware/Auth.js'

// na camada de route é armazenado os endpoints (url) da API

// Endpoit para lista todos os veículo
starshipRoutes.get("/starships",Auth.Authorization, starshipController.getAllStarships)

// Endpoint para Cadastrar / Criar um veículo
starshipRoutes.post("/starships", Auth.Authorization, starshipController.createStarship)

// Endpoint para deletar um veículo
starshipRoutes.delete("/starships/:id", Auth.Authorization, starshipController.deleteStarship)

// Endpoint para atualizar um veículo
starshipRoutes.put("/starships/:id", Auth.Authorization, starshipController.updateStarship)

// Endpoint para consultar um unico veículo
starshipRoutes.get("/starships/:id", Auth.Authorization, starshipController.getOneStarship)

export default starshipRoutes;

