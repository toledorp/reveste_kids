import express from 'express';
import personController from '../controllers/personController.js'
const personRoutes = express.Router()

//importando o middleware de autenticação. Obs so se import i middleware na rota de consumi
import Auth from '../middleware/Auth.js'

// na camada de route é armazenado os endpoints (url) da API

// Endpoit para lista todos os persons
personRoutes.get("/persons",Auth.Authorization, personController.getAllPersons)

// Endpoint para Cadastrar / Criar um personagem
personRoutes.post("/persons", Auth.Authorization, personController.createPerson)

// Endpoint para deletar um personagem
personRoutes.delete("/persons/:id", Auth.Authorization, personController.deletePerson)

// Endpoint para atualizar um personagem
personRoutes.put("/persons/:id", Auth.Authorization, personController.updatePerson)

// Endpoint para consultar um unico personagem
personRoutes.get("/persons/:id", Auth.Authorization, personController.getOnePerson)

export default personRoutes;

