//importando o Model
import Person from "../models/Persons.js";

class personService {
  // metodo (servio) para buscar todos os registro no banco
  // funções assincronas são nao bloqueantes
  async getAll() {
    // funçoes asincronas são não bloqueates
    try {
      // try trata o sucesso
      const persons = await Person.find(); // .find é motodo do mongoose para viscar reigistro no bd
      return persons;
    } catch (error) {
      // catch trata a falha
      console.log(error);
    }
  }

  // método para cadastrar um personagem
  async Create(name, birth_year, homeworld, species, descriptions) {
    try {
      const newPerson = new Person({
        //tecnica de desestruturação (destruction = forma sinplificada de escrever title: title)
        name,
        birth_year,
        homeworld,
        species,
        descriptions,
      });
      await newPerson.save(); // .save()metodo do Mongose para cadastar no BD
    } catch (error) {
      console.log(error);
    }
  }

  // método para deletar um personagem (delete)
  async delete(id) {
    try {
      await Person.findByIdAndDelete(id); // excluindo jogo pelo id
      console.log(`Personagem com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para atualizar um personagem (update)
  async update(id, name, birth_year, homeworld, species, descriptions) {
    try {
      await Person.findByIdAndUpdate(
        id,
        { name, 
          birth_year, 
          homeworld, 
          species, 
          descriptions },
        { new: true, runValidators: true }, // opção para retornar o documento atualizado e validar os dados
      );
      console.log(`O personagem com a ID ${id} foi alterado.`);
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para listar um personagem (findOne)
  async getOne(id) {
    try {
      const person = await Person.findOne({ _id: id });
      return person;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new personService(); // exportando a classe
