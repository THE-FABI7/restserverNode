const { response } = require("express");

const Producto = require("../models/producto");

const obtenerProductos = async (req, res = response) => {
  const { limit = 9, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query).skip(Number(desde)).limit(Number(limit)),
  ]);

  res.json({
    total,
    productos,
  });
};

const obtenerProducto = (req, res = response) => {};

const agregarProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;
  console.log("----------------------------------");
  const productoDb = await Producto.findOne({
    nombre: body.nombre.toUpperCase(),
  });

  //comprobar si la categoria existe
  if (productoDb) {
    return res.status(400).json({
      message: "Categorias not found in database " + productoDb + ".",
    });
  }

  //   generar la data para crear la categoria
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    user: req.usuario._id,
  };

  const productonuevo = new Producto(data);
  //guardar la categoria en la base de datos
  try {
    await productonuevo.save();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    productonuevo,
  });
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.user = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

const eliminarProducto = async (req, res = response) => {
  const { id } = req.params;

  const eliminarProducto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  if (eliminarProducto == null) {
    res.status(404).json({ msg: "Invalid id provided for product " + id });
  } else {
    res.json(eliminarProducto);
  }
};

module.exports = {
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProducto,
  obtenerProductos,
};
