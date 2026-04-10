//importando o service
import gameService from "../services/gameService.js";
//importando ObjectId do mongodb
import { ObjectId } from 'mongodb';

//Funçao para tratar a requisiçao de listar os jogos
const getAllGames = async (req, res) =>{
    try{
        const games = await gameService.getAll()
        res.status(200).json({games : games}) // cod.200 : Requisição feita com sucesso
    }catch(error){
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor'})
    }
}

// função para tratar a requiasição de CADASTRAR um jogo
const createGame = async(req, res) => {
    try{
        //Desestruturação
        // coletadno os dados do corpo da requisição
        const {title, year, price, descriptions} = req.body
        await gameService.Create(title, year, price, descriptions)
        //res.sendStatus(201) - usado para enviar apenas o status
        res.status(201).json({message: 'O jogo foi cadastrado com sucesso!'})
        // cod. 201 - CREATE - Um novo recurso foi criado no servidor
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor. Não foi possivel cadastrar o jogo'})
    }
}

// função para tratar a requisição de DELETAR um jogo
const deleteGame = async (req, res) => {
    try{
        const id = req.params.id
        if (ObjectId.isValid(id)){
            await gameService.delete(id)
            res.status(204).json({message : 'O jogo foi escluido com sucesso'})
        }else{
            res.status(400).json({ error: 'Ocorreu um erro na validação da ID'})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Erro interno do servidor. Não foi possível deletar o jogo'})
    }
}

// função para tratar a requisição de ATUALIZAR um jogo
const updateGame = async (req, res) => {
    try{
        const id = req.params.id
        if (ObjectId.isValid(id)){
            const {title, year, price, descriptions} = req.body
            await gameService.update(id, title, year, price, descriptions)
            res.status(200).json({message: 'Jogo atualizado com sucesso!'})
        }else{
            res.status(404).json({message: 'Jogo não encontrado'})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Erro interno do servidor. Não foi possível atualizar o jogo'})
    }
}

//função para buscar um unico jogo
const getOneGame = async (req, res)=>{
    try {
        const id = req.params.id
        if(ObjectId.isValid(id)){
            const game = await gameService.getOne(id)
            //Verificando se o jogo foi encontrado
            if(!game){// se o jogo não existir (1 = not)
                res.status(404).json({error:'O jogo buscado não foi encontrado.'})
            }else{ // jogo encontrado
                res.status(200).json({ game })
            }
            // se a ID for invalida
        }else {
            res.status(400).json({error: 'A ID informada é inválida'})
            // COD 400 - BAD request (requisição mal informada)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
}

export default { getAllGames, createGame, updateGame, deleteGame, getOneGame }