//importando o mongose no model de usuarios
import mongose from "mongoose";

const userSchema = new mongose.Schema({
    name: String,
    email: String,
    password: String,
})

const User = mongose.model("User", userSchema); // "Users"é o nome da coleção

export default User;
