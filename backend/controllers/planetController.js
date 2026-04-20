//importando o service
import planetService from "../services/planetService.js";
//importando ObjectId do mongodb
import { ObjectId } from "mongodb";

//Funçao para tratar a requisiçao de listar os planetas
const getAllPlanets = async (req, res) => {
  try {
    const planets = await planetService.getAll();
    res.status(200).json({ planets: planets }); // cod.200 : Requisição feita com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// função para tratar a requiasição de CADASTRAR um planeta
const createPlanet = async (req, res) => {
  try {
    //Desestruturação
    // coletando os dados do corpo da requisição
    const {
      name,
      rotation_period,
      orbital_period,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water,
      population,
    } = req.body;
    await planetService.Create(
      name,
      rotation_period,
      orbital_period,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water,
      population,
    );
    //res.sendStatus(201) - usado para enviar apenas o status
    res.status(201).json({ message: "O planeta foi cadastrado com sucesso!" });
    // cod. 201 - CREATE - Um novo recurso foi criado no servidor
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possivel cadastrar o planeta",
    });
  }
};

// função para tratar a requisição de DELETAR um planeta
const deletePlanet = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      await planetService.delete(id);
      res.status(204).json({ message: "O planeta foi excluido com sucesso" });
    } else {
      res.status(400).json({ error: "Ocorreu um erro na validação da ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possível deletar o planeta",
    });
  }
};

// função para tratar a requisição de ATUALIZAR um planeta
const updatePlanet = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const {
        name,
        rotation_period,
        orbital_period,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water,
        population,
      } = req.body;
      const update = await planetService.update(
        id,
        name,
        rotation_period,
        orbital_period,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water,
        population,
      );
      if(!update){
        res.status(404).json({ message: "Planeta não encontrado" });
      }
      res.status(200).json({ message: "Planeta atualizado com sucesso!" });
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Erro interno do servidor. Não foi possível atualizar o planeta",
    });
  }
};

//função para buscar um unico planeta
const getOnePlanet = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const planet = await planetService.getOne(id);
      //Verificando se o planeta foi encontrado
      if (!planet) {
        // se o planeta não existir (1 = not)
        res
          .status(404)
          .json({ error: "O planeta buscado não foi encontrado." });
      } else {
        // planeta encontrado
        res.status(200).json({ planet });
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
  getAllPlanets,
  createPlanet,
  updatePlanet,
  deletePlanet,
  getOnePlanet,
};
