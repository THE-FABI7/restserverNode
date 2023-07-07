// En tu archivo de middlewares
const Role = require("../models/role");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const EsRolValido = async (req, res, next) => {
  const { rol } = req.body;
  const existeRol = await Role.findOne({ rol });

  if (!existeRol) {
    return res.status(400).json({
      errors: [
        {
          msg: "No existe este rol en la base de datos",
          param: "rol",
          location: "body",
        },
      ],
    });
  }

  next(); // Llama a next() para pasar al siguiente middleware o controlador
};

const existeMail = async (req, res, next) => {
  const { correo } = req.body;
  const existeMailRegistrado = await User.findOne({ correo });

  if (existeMailRegistrado) {
    return res.status(400).json({ message: "el correo ya esta registrado" });
  }
  next();
};

const existeUserPorId = async (id) => {
  const existeUser = await User.findById(id);

  if (!existeUser) {
    throw new Error("User already exists in database " + id + "!");
  }
  next();
};

module.exports = {
  EsRolValido,
  existeMail,
  existeUserPorId,
};
