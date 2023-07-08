const { response } = require("express");
const bcryptjs = require("bcryptjs");
const user = require("../models/user");
const generarJWT = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar si el email existe en la base de datos
    const usuario = await user.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ message: "El usuario no existe" });
    }
    //SI el usuario esta activo
    if (!usuario.estado) {
      return res.status(404).json({ message: " El usuario no esta activado" });
    }
    //verificar la password
    const validarPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validarPassword) {
      return res.status(400).json({ message: " Password incorrect" });
    }

    //generar el jWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Login failed" });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  // console.log(id_token);

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await user.findOne({ correo });
    // console.log(usuario);

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":p",
        img,
        google: true,
      };
      try {
        usuario = new user(data);
        await usuario.save();
        console.log(usuario);
      } catch (error) {
        console.log("No se puede crear el usuario");
        console.log(error);
      }
    }

    //Si el usuario no esta activado
    if (!usuario.estado) {
      return res
        .status(401)
        .json({ msg: " unauthorized access to this user " + id_token });
    }
    //generar el token
    const token = await generarJWT(usuario.id);
    res.json({
      msg: "Google Sign In Success ",
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Google Sign In Failed",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
