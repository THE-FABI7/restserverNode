const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const usersGet = (req, res = response) => {
  const query = req.query;

  res.json({
    msg: "users get request",
    query,
  });
};

const userPost = async (req, res = response) => {
  const { nombre, correo, password, rol, estado, google } = req.body;

  try {
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario con la contraseña encriptada
    const newUser = new User({
      nombre,
      correo,
      password: hashedPassword,
      rol,
      estado,
      google,
    });

    const savedUser = await newUser.save();
    res.json({ msg: "User created", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const usersPut = (req, res = response) => {
  const { id } = req.params;

  res.json({ msg: "users put request", id });
};
const usersPatch = (req, res = response) => {
  res.json({ msg: "users patch request" });
};
const usersDelete = (req, res = response) => {
  res.json({ msg: "users delete request" });
};

module.exports = {
  usersGet,
  userPost,
  usersPut,
  usersPatch,
  usersDelete,
};
