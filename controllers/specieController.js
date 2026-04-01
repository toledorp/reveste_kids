//importando o service
import specieService from "../services/specieService.js";
//importando ObjectId do mongodb
import { ObjectId } from "mongodb";

//Funçao para tratar a requisiçao de listar todas as espécies
const getAllSpecies = async (req, res) => {
  try {
    const species = await specieService.getAll();
    res.status(200).json({ species: species }); // cod.200 : Requisição feita com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// função para tratar a requiasição de CADASTRAR uma espécie
const createSpecie = async (req, res) => {
  try {
    //Desestruturação
    // coletando os dados do corpo da requisição
    const {
      name,
      classification,
      designation,
      average_height,
      skin_colors,
      hair_colors,
      eye_colors,
      average_lifespan,
      language,
    } = req.body;
    await specieService.Create(
      name,
      classification,
      designation,
      average_height,
      skin_colors,
      hair_colors,
      eye_colors,
      average_lifespan,
      language,
    );
    //res.sendStatus(201) - usado para enviar apenas o status
    res.status(201).json({ message: "A espécie foi cadastrado com sucesso!" });
    // cod. 201 - CREATE - Um novo recurso foi criado no servidor
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possivel cadastrar a espécie",
    });
  }
};

// função para tratar a requisição de DELETAR uma espécie
const deleteSpecie = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      await specieService.delete(id);
      res.status(204).json({ message: "A esppécie foi excluida com sucesso" });
    } else {
      res.status(400).json({ error: "Ocorreu um erro na validação da ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possível deletar a espécie",
    });
  }
};

// função para tratar a requisição de ATUALIZAR uma espécie
const updateSpecie = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const {
        name,
        classification,
        designation,
        average_height,
        skin_colors,
        hair_colors,
        eye_colors,
        average_lifespan,
        language,
      } = req.body;
      const update = await specieService.update(
        id,
        name,
        classification,
        designation,
        average_height,
        skin_colors,
        hair_colors,
        eye_colors,
        average_lifespan,
        language,
      );
      if(!update){
        res.status(404).json({ message: "Espécie não encontrado" });
      }
      res.status(200).json({ message: "Espécie atualizado com sucesso!" });
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possível atualizar a espécie. ",
    });
  }
};

//função para buscar uma unica espécie
const getOneSpecie = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const specie = await specieService.getOne(id);
      //Verificando se a especie foi encontrada
      if (!specie) {
        // se a espécie não existir (1 = not)
        res.status(404).json({ error: "A espécie buscada não foi encontrado." });
      } else {
        // especie encontrada
        res.status(200).json({ specie });
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
  getAllSpecies,
  createSpecie,
  updateSpecie,
  deleteSpecie,
  getOneSpecie,
};
