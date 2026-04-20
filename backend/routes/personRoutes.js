import express from 'express';
import personController from '../controllers/personController.js'
const personRoutes = express.Router()

//importando o middleware de autenticação. Obs so se import i middleware na rota de consumi
import Auth from '../middleware/Auth.js'

// importando o middleware de autenticação do administrador
import isAdmin from "../middleware/isAdmin.js";


// Endpoit para lista todos os persons
personRoutes.get("/persons",Auth.Authorization, personController.getAllPersons)

// Endpoint para Cadastrar / Criar um personagem
personRoutes.post("/persons", Auth.Authorization, isAdmin, personController.createPerson)

// Endpoint para deletar um personagem
personRoutes.delete("/persons/:id", Auth.Authorization, isAdmin, personController.deletePerson)

// Endpoint para atualizar um personagem
personRoutes.put("/persons/:id", Auth.Authorization, isAdmin, personController.updatePerson)

// Endpoint para consultar um unico personagem
personRoutes.get("/persons/:id", Auth.Authorization, personController.getOnePerson)

export default personRoutes;

