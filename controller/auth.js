const { response } = require("express");
const bcryptjs = require("bcryptjs");
const user = require("../models/user");
const generarJWT = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

    const {correo, password} = req.body;

  try {

    //verificar si el email existe en la base de datos
    const usuario = await user.findOne({ correo });

    if(!usuario) {
        return res.status(404).json({ message: "El usuario no existe" });
    }
    //SI el usuario esta activo
    if(!usuario.estado){
        return res.status(404).json({ message: " El usuario no esta activado" });
    }
    //verificar la password
    const validarPassword = bcryptjs.compareSync(password, usuario.password)

    if(!validarPassword){
        return res.status(400).json({ message: " Password incorrect" });
    }
     
    //generar el jWT
    const token = await generarJWT(user.id)

   
    res.json({
        usuario, token 
    } ) 
  } catch (error) {
     console.log(error);
     return res.status(500).json({ msg : "Login failed" });
  }
};


module.exports = {
    login
}