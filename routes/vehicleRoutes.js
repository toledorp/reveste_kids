import express from 'express';
import vehicleController from '../controllers/vehicleController.js'
const vehicleRoutes = express.Router()

//importando o middleware de autenticação. Obs so se import i middleware na rota de consumo
import Auth from '../middleware/Auth.js'

// na camada de route é armazenado os endpoints (url) da API

// Endpoit para lista todos os veículo
vehicleRoutes.get("/vehicles",Auth.Authorization, vehicleController.getAllVehicles)

// Endpoint para Cadastrar / Criar um veículo
vehicleRoutes.post("/vehicles", Auth.Authorization, vehicleController.createVehicle)

// Endpoint para deletar um veículo
vehicleRoutes.delete("/vehicles/:id", Auth.Authorization, vehicleController.deleteVehicle)

// Endpoint para atualizar um veículo
vehicleRoutes.put("/vehicles/:id", Auth.Authorization, vehicleController.updateVehicle)

// Endpoint para consultar um unico veículo
vehicleRoutes.get("/vehicles/:id", Auth.Authorization, vehicleController.getOneVehicle)

export default vehicleRoutes;

