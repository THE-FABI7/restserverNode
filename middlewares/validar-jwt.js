const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const Usuario = require("../models/user.js");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  // console.log(token);

  if (!token) {
    return res
      .status(400)
      .json({ message: "Invalid token provided in request body." });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe DB",
      });
    }

    // Verificar si el uid tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado: false",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: " Token invalido." });
  }
};

module.exports = {
  validarJWT,
};
