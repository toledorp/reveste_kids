//importando o service
import vehicleService from "../services/vehicleService.js";
//importando ObjectId do mongodb
import { ObjectId } from "mongodb";

//Funçao para tratar a requisiçao de listar os veiculos
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAll();
    res.status(200).json({ vehicles: vehicles }); // cod.200 : Requisição feita com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// função para tratar a requiasição de CADASTRAR um veículos
const createVehicle = async (req, res) => {
  try {
    //Desestruturação
    // coletadno os dados do corpo da requisição
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
      vehicle_class,
    } = req.body;
    await vehicleService.Create(
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
      vehicle_class,
    );
    //res.sendStatus(201) - usado para enviar apenas o status
    res.status(201).json({ message: "O veículos foi cadastrado com sucesso!" });
    // cod. 201 - CREATE - Um novo recurso foi criado no servidor
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possivel cadastrar o veículos",
    });
  }
};

// função para tratar a requisição de DELETAR um veículo
const deleteVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      await vehicleService.delete(id);
      res.status(204).json({ message: "O veículos foi excluido com sucesso" });
    } else {
      res.status(400).json({ error: "Ocorreu um erro na validação da ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro interno do servidor. Não foi possível deletar o veículo",
    });
  }
};

// função para tratar a requisição de ATUALIZAR um veículo
const updateVehicle = async (req, res) => {
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
        vehicle_class,
      } = req.body;
      const update = await vehicleService.update(
        id,
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
        vehicle_class,
      );
      if(!update){
        res.status(404).json({ message: "Veículo não encontrado" });
      }
      res.status(200).json({ message: "Veículo atualizado com sucesso!" });
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Erro interno do servidor. Não foi possível atualizar o veículo",
    });
  }
};

//função para buscar um unico veículo
const getOneVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const vehicle = await vehicleService.getOne(id);
      //Verificando se o veículo foi encontrado
      if (!vehicle) {
        // se o veículo não existir (1 = not)
        res
          .status(404)
          .json({ error: "O veículo buscado não foi encontrado." });
      } else {
        // veículo encontrado
        res.status(200).json({ vehicle });
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
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getOneVehicle,
};
