import express from 'express';
import filmController from '../controllers/filmController.js'
const filmRoutes = express.Router()

//importando o middleware de autenticação. Obs so se import i middleware na rota de consumo
import Auth from '../middleware/Auth.js'

// na camada de route é armazenado os endpoints (url) da API

// Endpoit para lista todos os veículo
filmRoutes.get("/films",Auth.Authorization, filmController.getAllFilms)

// Endpoint para Cadastrar / Criar um veículo
filmRoutes.post("/films", Auth.Authorization, filmController.createFilm)

// Endpoint para deletar um veículo
filmRoutes.delete("/films/:id", Auth.Authorization, filmController.deleteFilm)

// Endpoint para atualizar um veículo
filmRoutes.put("/films/:id", Auth.Authorization, filmController.updateFilm)

// Endpoint para consultar um unico veículo
filmRoutes.get("/films/:id", Auth.Authorization, filmController.getOneFilm)

export default filmRoutes;

