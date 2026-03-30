//importando o service
import starshipService from "../services/starshipService.js";
//importando ObjectId do mongodb
import { ObjectId } from "mongodb";

//Funçao para tratar a requisiçao de listar todas as espaçonaves
const getAllStarships = async (req, res) => {
  try {
    const starships = await starshipService.getAll();
    res.status(200).json({ starships: starships }); // cod.200 : Requisição feita com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// função para tratar a requiasição de CADASTRAR uma espaçonave
const createStarship = async (req, res) => {
  try {
    //Desestruturação
    // coletando os dados do corpo da requisição
    const {
      name,
      model,
      manufacturer,
      cost_in_credits,
      length,
      max_atmosphering_speed,
      crew,
      passengers,
      cargo_capacity,
      consumables,
      hyperdrive_rating,
      MGLT,
      starship_class,
    } = req.body;
    await starshipService.Create(
      name,
      model,
      manufacturer,
      cost_in_credits,
      length,
      max_atmosphering_speed,
      crew,
      passengers,
      cargo_capacity,
      consumables,
      hyperdrive_rating,
      MGLT,
      starship_class,
    );
    //res.sendStatus(201) - usado para enviar apenas o status
    res.status(201).json({ message: "A espaçonave foi cadastrado com sucesso!" });
    // cod. 201 - CREATE - Um novo recurso foi criado no servidor
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possivel cadastrar a espécie",
    });
  }
};

// função para tratar a requisição de DELETAR uma espaçonave
const deleteStarship = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      await starshipService.delete(id);
      res.status(204).json({ message: "A espaçonave foi excluida com sucesso" });
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

// função para tratar a requisição de ATUALIZAR uma espaçonave
const updateStarship = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const {
        name,
        model,
        manufacturer,
        cost_in_credits,
        length,
        max_atmosphering_speed,
        crew,
        passengers,
        cargo_capacity,
        consumables,
        hyperdrive_rating,
        MGLT,
        starship_class,
      } = req.body;
      await starshipService.update(
        name,
        model,
        manufacturer,
        cost_in_credits,
        length,
        max_atmosphering_speed,
        crew,
        passengers,
        cargo_capacity,
        consumables,
        hyperdrive_rating,
        MGLT,
        starship_class,
      );
      res.status(200).json({ message: "Espaçonave atualizado com sucesso!" });
    } else {
      res.status(404).json({ message: "Espaçonave não encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possível atualizar a espaçonave. ",
    });
  }
};

//função para buscar uma unica espaçonave
const getOneStarship = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const starship = await starshipService.getOne(id);
      //Verificando se a espaçonave foi encontrada
      if (!starship) {
        // se a espaçonave não existir (1 = not)
        res
          .status(404)
          .json({ error: "A espaçonave buscada não foi encontrado." });
      } else {
        // espaçonave encontrada
        res.status(200).json({ starship });
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
  getAllStarships,
  createStarship,
  updateStarship,
  deleteStarship,
  getOneStarship,
};
