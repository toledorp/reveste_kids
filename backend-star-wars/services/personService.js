//importando o Model
import Person from "../models/Persons.js";

class personService {
  // metodo (servio) para buscar todos os registro no banco
  async getAll() {
    try {
      const persons = await Person.find()
        .populate("homeworld")
        .populate("species");

      return persons;
    } catch (error) {
      console.log(error);
    }
  }

  // método para cadastrar um personagem
  async Create(name, birth_year, homeworld, species, descriptions) {
    try {
      const newPerson = new Person({
        name,
        birth_year,
        homeworld,
        species,
        descriptions,
      });

      await newPerson.save();
    } catch (error) {
      console.log(error);
    }
  }

  // método para deletar um personagem
  async delete(id) {
    try {
      await Person.findByIdAndDelete(id);
      console.log(`Personagem com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para atualizar um personagem
  async update(id, name, birth_year, homeworld, species, descriptions) {
    try {
      const update = await Person.findByIdAndUpdate(
        id,
        {
          name,
          birth_year,
          homeworld,
          species,
          descriptions,
        },
        { new: true, runValidators: true },
      );

      return update;
    } catch (error) {
      throw error;
    }
  }

  // metodo para listar um personagem
  async getOne(id) {
    try {
      const person = await Person.findOne({ _id: id })
        .populate("homeworld")
        .populate("species");

      return person;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new personService();
