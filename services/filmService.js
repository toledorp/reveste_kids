//importando o Model
import Film from "../models/Films.js";

class filmService {
  // metodo (servio) para buscar todos os registro no banco
  // funções assincronas são nao bloqueantes
  async getAll() {
    // funçoes assincronas são não bloqueates
    try {
      // try trata o sucesso
      const films = await Film.find(); // .find é motodo do mongoose para viscar reigistro no bd
      return films;
    } catch (error) {
      // catch trata a falha
      console.log(error);
    }
  }

  // método para cadastrar um filme
  async Create(title, episode_id, opening_crawl, director, release_date) {
    try {
      const newFilm = new Film({
        //tecnica de desestruturação (destruction = forma sinplificada de escrever title: title)
        title,
        episode_id,
        opening_crawl,
        director,
        release_date,
      });
      await newFilm.save(); // .save()metodo do Mongose para cadastar no BD
    } catch (error) {
      console.log(error);
    }
  }

  // método para deletar um filme (delete)
  async delete(id) {
    try {
      await Film.findByIdAndDelete(id); // excluindo film pelo id
      console.log(`O filme com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para atualizar um filme (update)
  async update(id, title, episode_id, opening_crawl, director, release_date) {
    try {
      const update = await Film.findByIdAndUpdate(
        id,
        {
          title,
          episode_id,
          opening_crawl,
          director,
          release_date,
        },
        { new: true, runValidators: true }, // opção para retornar o documento atualizado e validar os dados
      );
      return update;
    } catch (error) {
      throw(error);
    }
  }

  // metodo para listar um filme (findOne)
  async getOne(id) {
    try {
      const film = await Film.findOne({ _id: id });
      return film;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new filmService(); // exportando a classe
