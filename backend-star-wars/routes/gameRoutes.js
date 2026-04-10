import express from 'express';
import gameController from '../controllers/gameController.js'
const gameRoutes = express.Router()

//importando o middleware de autenticação. Obs so se import i middleware na rota de consumi
import Auth from '../middleware/Auth.js'

// na camada de route é armazenado os endppits (url) da API

// Endpoit para lista todos os games
gameRoutes.get("/games",Auth.Authorization, gameController.getAllGames)

// Endpoint para Cadastrar / Criar um jogo
gameRoutes.post("/games", Auth.Authorization, gameController.createGame)

// Endpoint para deletar um jogo
gameRoutes.delete("/games/:id", Auth.Authorization, gameController.deleteGame)

// Endpoint para atualizar um jogo
gameRoutes.put("/games/:id", Auth.Authorization, gameController.updateGame)

// Endpoint para consultar um unico jogo
gameRoutes.get("/games/:id", Auth.Authorization, gameController.getOneGame)

export default gameRoutes;

