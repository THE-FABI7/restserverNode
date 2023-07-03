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

/**
 * La función userPost recibe datos del usuario, cifra la contraseña, crea un nuevo objeto de usuario,
 * lo guarda en la base de datos y devuelve una respuesta con el usuario guardado.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de la solicitud, el cuerpo de la solicitud y los
 * parámetros de la solicitud.
 * @param [res] - El parámetro `res` es el objeto de respuesta que se usa para enviar la respuesta al
 * cliente. Es una instancia del objeto `respuesta` del marco Express.
 */
const userPost = async (req, res = response) => {
  const { nombre, correo, password, rol, estado, google } = req.body;

  try {
    // Encriptar la contraseña
    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hashSync(password, salt);

    // Crear el usuario con la contraseña encriptada
    const newUser = new User({
      nombre,
      correo,
      password: hashedPassword,
      rol,
      estado,
      google,
    });

    //guardar el usuario en la base de datos
    const savedUser = await newUser.save();
    res.json({ msg: "User created", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * La función actualiza la información de un usuario en una base de datos.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP realizada por el cliente. Incluye propiedades como los encabezados de la solicitud,
 * el cuerpo de la solicitud, el método de la solicitud, la URL de la solicitud y los parámetros de la
 * solicitud.
 * @param [res] - El parámetro `res` es el objeto de respuesta que se usa para enviar la respuesta al
 * cliente. Es una instancia del objeto `respuesta` del marco Express.
 */
const usersPut = async (req, res = response) => {
  const { id } = req.params;

  const { _id, password, google, correo, ...resto } = req.body;

  //TODO: validar la contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

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
