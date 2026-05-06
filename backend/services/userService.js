import User from "../models/Users.js";

class userService {
  // criar usuário
  async Create(name, email, password, role = "user") {
    try {
      const newUser = new User({
        name,
        email,
        password,
        role,
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // buscar por email
  async getOne(email) {
    try {
      return await User.findOne({ email: email });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // 🔥 BUSCAR POR NOME (AGORA DENTRO DA CLASSE)
  async searchByName(name) {
    try {
      return await User.find({
        name: { $regex: name, $options: "i" },
      }).select("_id name");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new userService();