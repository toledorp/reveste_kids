//importando o service
import personService from "../services/personService.js";
//importando ObjectId do mongodb
import { ObjectId } from "mongodb";

//Funçao para tratar a requisiçao de listar os personagems
const getAllPersons = async (req, res) => {
  try {
    const persons = await personService.getAll();
    res.status(200).json({ persons: persons }); // cod.200 : Requisição feita com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// função para tratar a requiasição de CADASTRAR um personagem
const createPerson = async (req, res) => {
  try {
    //Desestruturação
    // coletadno os dados do corpo da requisição
    const { name, birth_year, homeworld, species, descriptions } = req.body;
    await personService.Create(
      name,
      birth_year,
      homeworld,
      species,
      descriptions,
    );
    //res.sendStatus(201) - usado para enviar apenas o status
    res
      .status(201)
      .json({ message: "O personagem foi cadastrado com sucesso!" });
    // cod. 201 - CREATE - Um novo recurso foi criado no servidor
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error:
          "Erro interno do servidor. Não foi possivel cadastrar o personagem",
      });
  }
};

// função para tratar a requisição de DELETAR um personagem
const deletePerson = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      await personService.delete(id);
      res
        .status(204)
        .json({ message: "O personagem foi excluido com sucesso" });
    } else {
      res.status(400).json({ error: "Ocorreu um erro na validação da ID" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error:
          "Erro interno do servidor. Não foi possível deletar o personagem",
      });
  }
};

// função para tratar a requisição de ATUALIZAR um personagem
const updatePerson = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const { name, birth_year, homeworld, species, descriptions } = req.body;
      const update = await personService.update(
        id,
        name,
        birth_year,
        homeworld,
        species,
        descriptions,
      );
      if(!update){
        res.status(404).json({ message: "Personagem não encontrado" });
      }
      res.status(200).json({ message: "Personagem atualizado com sucesso!" });
    } 
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Erro interno do servidor. Não foi possível atualizar o personagem",
      });
  }
};

//função para buscar um unico personagem
const getOnePerson = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const person = await personService.getOne(id);
      //Verificando se o personagem foi encontrado
      if (!person) {
        // se o personagem não existir (1 = not)
        res
          .status(404)
          .json({ error: "O personagem buscado não foi encontrado." });
      } else {
        // personagem encontrado
        res.status(200).json({ person });
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
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
  getOnePerson,
};
