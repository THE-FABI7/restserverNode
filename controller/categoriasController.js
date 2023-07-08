const { response } = require("express");
const categoria = require("../models/categorias");

const obtenerCategorias = async (req, res) => {
  const { limit = 9, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    categoria.countDocuments(query),
    categoria.find(query).skip(Number(desde)).limit(Number(limit)),
  ]);

  res.json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req, res) => {
  const { id } = req.params;
  const categoriaid = await categoria.findById(id).populate("user", "nombre");

  res.json(categoriaid);
};

const crearCateroria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDb = await categoria.findOne({ nombre });

  //comprobar si la categoria existe
  if (categoriaDb) {
    return res.status(400).json({
      message: "Categorias not found in database " + categoriaDb + ".",
    });
  }

  //   generar la data para crear la categoria
  const data = {
    nombre,
    user: req.usuario._id,
  };

  const categoria2 = new categoria(data);
  //guardar la categoria en la base de datos
  try {
    await categoria2.save();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    categoria2,
  });
};

module.exports = {
  crearCateroria,
  obtenerCategorias,
  obtenerCategoria
};
