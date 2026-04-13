import express from 'express';
import filmController from '../controllers/filmController.js'
const filmRoutes = express.Router()

//importando o middleware de autenticação. 
import Auth from '../middleware/Auth.js'

// importando o middleware de autenticação do administrador
import isAdmin from "../middleware/isAdmin.js";


// Endpoit para lista todos os filmes
filmRoutes.get("/films",Auth.Authorization, filmController.getAllFilms)

// Endpoint para Cadastrar / Criar um filme
filmRoutes.post("/films", Auth.Authorization, isAdmin, filmController.createFilm)
// Endpoint para deletar um filme
filmRoutes.delete("/films/:id", Auth.Authorization, filmController.deleteFilm)

// Endpoint para atualizar um filme
filmRoutes.put("/films/:id", Auth.Authorization, filmController.updateFilm)

// Endpoint para consultar um unico filme
filmRoutes.get("/films/:id", Auth.Authorization, filmController.getOneFilm)

export default filmRoutes;

