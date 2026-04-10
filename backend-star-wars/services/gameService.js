//importando o Model
import Game from "../models/Games.js";

class gameService {
  // metodo (servio) para buscar todos os registro no banco
  // funções assincronas são nao bloqueantes
  async getAll() {
    // funçoes asincronas são não bloqueates
    try {
      // try trata o sucesso
      const games = await Game.find(); // .find é motodo do mongoose para viscar reigistro no bd
      return games;
    } catch (error) {
      // catch trata a falha
      console.log(error);
    }
  }

  // método para cadastrar um game
  async Create(title, year, price, descriptions) {
    try {
      const newGame = new Game({
        //tecnica de desestruturação (destruction = forma sinplificada de escrever title: title)
        title,
        year,
        price,
        descriptions
      });
      await newGame.save(); // .save()metodo do Mongose para cadastar no BD
    } catch (error) {
      console.log(error);
    }
  }

  // método para deletar um game (delete)
  async delete(id) {
    try {
      await Game.findByIdAndDelete(id);  // excluindo jogo pelo id
      console.log(`Game com a id: ${id} foi deletado`)
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para atualizar um game (update)
  async update(id, title, year, price, descriptions) {
    try {
      await Game.findByIdAndUpdate(
        id,
        { title, 
          year, 
          price, 
          descriptions},
        { new: true, runValidators: true } // opção para retornar o documento atualizado e validar os dados
      );
      console.log(`O jogo com a ID ${id} foi alterado.`)
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para listar um game (findOne)
  async getOne(id){
    try {
      const game = await Game.findOne({id: id});
      return game;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new gameService(); // exportando a classe
