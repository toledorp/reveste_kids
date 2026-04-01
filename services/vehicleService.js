//importando o Model
import Vehicle from "../models/Vehicles.js";

class vehicleService {
  // metodo (servio) para buscar todos os registro no banco
  // funções assincronas são nao bloqueantes
  async getAll() {
    // funçoes asincronas são não bloqueates
    try {
      // try trata o sucesso
      const vehicles = await Vehicle.find(); // .find é motodo do mongoose para viscar reigistro no bd
      return vehicles;
    } catch (error) {
      // catch trata a falha
      console.log(error);
    }
  }

  // método para cadastrar um veículo
  async Create(
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
  ) {
    try {
      const newVehicle = new Vehicle({
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
        vehicle_class,
      });
      await newVehicle.save(); // .save()metodo do Mongose para cadastar no BD
    } catch (error) {
      console.log(error);
    }
  }

  // método para deletar um veículo (delete)
  async delete(id) {
    try {
      await Vehicle.findByIdAndDelete(id); // excluindo veículo pelo id
      console.log(`Veículo com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para atualizar um veículo (update)
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
    vehicle_class,
  ) {
    try {
      const updated = await Vehicle.findByIdAndUpdate(
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
          vehicle_class,
        },
        { new: true, runValidators: true }, // opção para retornar o documento atualizado e validar os dados
      );

      return updated;
    } catch (error) {
      throw error;
    }
  }

  // metodo para listar um veículo (findOne)
  async getOne(id) {
    try {
      const vehicle = await Vehicle.findOne({ _id: id });
      return vehicle;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new vehicleService(); // exportando a classe
