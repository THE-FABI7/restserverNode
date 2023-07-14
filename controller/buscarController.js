const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const Usuario = require("../models/user");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuario = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }
};

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
      break;
    case "productos":
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
