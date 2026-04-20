//importando o Model
import Starship from "../models/Starships.js";

class starshipService {
  // metodo (servio) para buscar todos os registro no banco
  // funções assincronas são nao bloqueantes
  async getAll() {
    // funçoes asincronas são não bloqueates
    try {
      // try trata o sucesso
      const starships = await Starship.find(); // .find é motodo do mongoose para viscar reigistro no bd
      return starships;
    } catch (error) {
      // catch trata a falha
      console.log(error);
    }
  }

  // método para cadastrar uma espaçonave
  async create(
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
  ) {
    try {
      const newStarship = new Starship({
        //tecnica de desestruturação (destruction = forma sinplificada de escrever title: title)
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
      });
      await newStarship.save(); // .save()metodo do Mongose para cadastar no BD
    } catch (error) {
      console.log(error);
    }
  }

  // método para deletar uma espaçonave (delete)
  async delete(id) {
    try {
      await Starship.findByIdAndDelete(id); // excluindo espaçonave pelo id
      console.log(`A espaçonave com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para atualizar uma espaçonave (update)
async update(
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
  hyperdrive_rating,
  MGLT,
  starship_class,
) {
  try {
    const updated = await Starship.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true, runValidators: true }
    );

    return updated;
  } catch (error) {
    throw error;
  }
}

  // metodo para listar uma espaçonave (findOne)
  async getOne(id) {
    try {
      const starship = await Starship.findOne({ _id: id });
      return starship;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new starshipService(); // exportando a classe
