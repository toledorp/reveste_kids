//importando o service
import filmService from "../services/filmService.js";
//importando ObjectId do mongodb
import { ObjectId } from "mongodb";

//Funçao para tratar a requisiçao de listar os veiculos
const getAllFilms = async (req, res) => {
  try {
    const films = await filmService.getAll();
    res.status(200).json({ films: films }); // cod.200 : Requisição feita com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// função para tratar a requiasição de CADASTRAR um filme
const createFilm = async (req, res) => {
  try {
    //Desestruturação
    // coletadno os dados do corpo da requisição
    const { title, episode_id, opening_crawl, director, release_date } =
      req.body;
    await filmService.Create(
      title,
      episode_id,
      opening_crawl,
      director,
      release_date,
    );
    //res.sendStatus(201) - usado para enviar apenas o status
    res.status(201).json({ message: "O filme foi cadastrado com sucesso!" });
    // cod. 201 - CREATE - Um novo recurso foi criado no servidor
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possivel cadastrar o filme",
    });
  }
};

// função para tratar a requisição de DELETAR um filme
const deleteFilm = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      await filmService.delete(id);
      res.status(204).json({ message: "O filme foi excluido com sucesso" });
    } else {
      res.status(400).json({ error: "Ocorreu um erro na validação da ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possível deletar o filme",
    });
  }
};

// função para tratar a requisição de ATUALIZAR um filme
const updateFilm = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const { title, episode_id, opening_crawl, director, release_date } =
        req.body;
      const update = await filmService.update(
        id,
        title,
        episode_id,
        opening_crawl,
        director,
        release_date,
      );
      if (!update) {
        res.status(404).json({ message: "Filme não encontrado" });
      }
      res.status(200).json({ message: "Filme atualizado com sucesso!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possível atualizar o Filme",
    });
  }
};

//função para buscar um unico Filme
const getOneFilm = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const film = await filmService.getOne(id);
      //Verificando se o filme foi encontrado
      if (!film) {
        // se o filme não existir (1 = not)
        res.status(404).json({ error: "O filme buscado não foi encontrado." });
      } else {
        // filme encontrado
        res.status(200).json({ film });
      }
      // se a ID for invalida
    } else {
      res.status(400).json({ error: "A ID informada é inválida" });
      // COD 400 - BAD request (requisição mal informada)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default {
  getAllFilms,
  createFilm,
  updateFilm,
  deleteFilm,
  getOneFilm,
};
