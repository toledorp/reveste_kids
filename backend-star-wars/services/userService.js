//importando o model de usuarios
import User from "../models/Users.js"

class userService{
    //Metodo para cadastar um usuario
    async Create(name, email, password){
        try{
            const newUser = new User({
                name,
                email,
                password
            })
            //.save() -> utilzado para gravar um registro no BD
            await newUser.save();
        }catch (error){
            console.log(error)
        }
    }

    //método para buscar um usuario
    async getOne(email){
        try{
            // o metodo findone busca um reguistro no bd
            const user = await User.findOne({email: email})
            return user
        }catch (error) {
            console.log(error)
        }
    }
}

export default new userService();