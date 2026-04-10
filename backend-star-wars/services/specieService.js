//importando o Model
import Specie from "../models/Species.js";

class specieService {
  // metodo (servio) para buscar todos os registro no banco
  // funções assincronas são nao bloqueantes
  async getAll() {
    // funçoes asincronas são não bloqueates
    try {
      // try trata o sucesso
      const species = await Specie.find(); // .find é motodo do mongoose para viscar reigistro no bd
      return species;
    } catch (error) {
      // catch trata a falha
      console.log(error);
    }
  }

  // método para cadastrar um especie
  async Create(
    name,
    classification,
    designation,
    average_height,
    skin_colors,
    hair_colors,
    eye_colors,
    average_lifespan,
    language,
  ) {
    try {
      const newSpecie = new Specie({
        //tecnica de desestruturação (destruction = forma sinplificada de escrever title: title)
        name,
        classification,
        designation,
        average_height,
        skin_colors,
        hair_colors,
        eye_colors,
        average_lifespan,
        language,
      });
      await newSpecie.save(); // .save()metodo do Mongose para cadastar no BD
    } catch (error) {
      console.log(error);
    }
  }

  // método para deletar uma especie (delete)
  async delete(id) {
    try {
      await Specie.findByIdAndDelete(id); // excluindo especie pelo id
      console.log(`A espécie com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para atualizar uma espécie (update)
  async update(
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
  ) {
    try {
      const updated = await Specie.findByIdAndUpdate(
        id,
        {
          name,
          classification,
          designation,
          average_height,
          skin_colors,
          hair_colors,
          eye_colors,
          average_lifespan,
          language,
        },
        { new: true, runValidators: true }, // opção para retornar o documento atualizado e validar os dados
      );

      return updated;
    } catch (error) {
      throw error;
    }
  }

  // metodo para listar uma espécie (findOne)
  async getOne(id) {
    try {
      const specie = await Specie.findOne({ _id: id });
      return specie;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new specieService(); // exportando a classe
