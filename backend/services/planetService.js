//importando o Model
import Planet from "../models/Planets.js";

class planetService {
  // metodo (servio) para buscar todos os registro no banco
  // funções assincronas são nao bloqueantes
  async getAll() {
    // funçoes asincronas são não bloqueates
    try {
      // try trata o sucesso
      const planets = await Planet.find(); // .find é motodo do mongoose para viscar reigistro no bd
      return planets;
    } catch (error) {
      // catch trata a falha
      console.log(error);
    }
  }

  // método para cadastrar um planeta
  async Create(
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
  ) {
    try {
      const newPlanet = new Planet({
        //tecnica de desestruturação (destruction = forma sinplificada de escrever title: title)
        name,
        rotation_period,
        orbital_period,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water,
        population,
      });
      await newPlanet.save(); // .save()metodo do Mongose para cadastar no BD
    } catch (error) {
      console.log(error);
    }
  }

  // método para deletar um planeta (delete)
  async delete(id) {
    try {
      await Planet.findByIdAndDelete(id); // excluindo planeta pelo id
      console.log(`Planeta com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para atualizar um planeta (update)
  async update(
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
  ) {
    try {
      const updated = await Planet.findByIdAndUpdate(
        id,
        {
          name,
          rotation_period,
          orbital_period,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water,
          population,
        },
        { new: true, runValidators: true }, // opção para retornar o documento atualizado e validar os dados
      );

      return updated;
      //   console.log(`O planeta com a ID ${id} foi alterado.`);
    } catch (error) {
      throw error;
    }
  }

  // metodo para listar um planeta (findOne)
  async getOne(id) {
    try {
      const planet = await Planet.findOne({ _id: id });
      return planet;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new planetService(); // exportando a classe
