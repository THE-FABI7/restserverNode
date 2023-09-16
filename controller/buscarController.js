const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const Usuario = require("../models/user");
const Categoria = require("../models/categorias");
const Producto = require("../models/producto");
const Rol = require("../models/role");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuario = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategoria = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const categorias = await Categoria.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: productos,
  });
};

/**
 * La función "buscar" es una función de JavaScript que toma un objeto de solicitud y respuesta, y en
 * función de la colección proporcionada y el término de búsqueda, realiza una operación de búsqueda en
 * diferentes colecciones como "usuarios", "categorías" y "productos". .
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP realizada por el cliente. Incluye propiedades como el método de solicitud, los
 * encabezados de la solicitud, el cuerpo de la solicitud y los parámetros de la solicitud.
 * @param [res] - El parámetro `res` es el objeto de respuesta que se usa para enviar la respuesta al
 * cliente. Es una instancia del objeto `respuesta` del marco Express.
 * @returns un objeto de respuesta con un código de estado y un objeto JSON que contiene un mensaje de
 * error.
 */
const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res
      .status(404)
      .json({ errors: "coleccionesPermitidas son : " + coleccionesPermitidas });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuario(termino, res);
      break;
    case "categorias":
      buscarCategoria(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    case "roles":
      break;
    default:
      res.status(500).json({ errors: " no se ha realizado una busqueda" });
  }
};

module.exports = {
  buscar,
};
