const { response } = require("express");
const categoria = require("../models/categorias");

/**
 * La función `obtenerCategorias` recupera un número específico de categorías de una base de datos y
 * devuelve el recuento total y las categorías.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de solicitud, los parámetros de consulta y los datos
 * del cuerpo. Se utiliza para recuperar información del cliente y pasarla al código del lado del
 * servidor.
 * @param res - El parámetro "res" es el objeto de respuesta que se utiliza para enviar una respuesta
 * al cliente. Es una instancia del objeto de respuesta Express.
 */
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
/**
 * La función "obtenerCategoria" recupera una categoría por su ID y rellena el campo "usuario" con la
 * propiedad "nombre".
 * @param req - El parámetro `req` es un objeto que representa la solicitud HTTP realizada por el
 * cliente. Contiene información como los encabezados de la solicitud, el cuerpo de la solicitud, el
 * método de la solicitud, la URL de la solicitud y los parámetros de la solicitud.
 * @param res - El parámetro "res" es el objeto de respuesta que se utiliza para enviar una respuesta
 * al cliente. Es una instancia del objeto de respuesta Express.
 * @returns Si `categoriaid` es nulo, se devolverá una respuesta con el código de estado 401 y un
 * objeto JSON que contiene el mensaje "ID de categoría no válido". De lo contrario, el objeto
 * `categoriaid` se devolverá como una respuesta JSON.
 */

const obtenerCategoria = async (req, res) => {
  const { id } = req.params;
  const categoriaid = await categoria.findById(id).populate("user", "nombre");

  if (categoriaid == null) {
    return res.status(401).json({ msg: " Invalid categoria id" });
  } else {
    res.json(categoriaid);
  }
};

/**
 * Esta función crea una nueva categoría en una base de datos si aún no existe.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP realizada por el cliente. Incluye propiedades como `body`, `params`, `query`,
 * `headers`, etc., que proporcionan acceso a los datos de la solicitud.
 * @param [res] - El parámetro `res` es el objeto de respuesta que se usa para enviar la respuesta al
 * cliente. Es una instancia del objeto `respuesta` del marco Express.
 * @returns una respuesta JSON con el objeto de categoría creado si la categoría aún no existe en la
 * base de datos. Si la categoría ya existe, devuelve una respuesta JSON con un código de estado 400 y
 * un mensaje que indica que la categoría no se encontró en la base de datos.
 */
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

/**
 * La función `actualizarCategoria` actualiza una categoría en una base de datos basada en la
 * identificación proporcionada y devuelve la categoría actualizada.
 * @param req - El parámetro `req` es el objeto de la solicitud, que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de la solicitud, el cuerpo de la solicitud y los
 * parámetros de la solicitud.
 * @param res - El parámetro `res` es el objeto de respuesta que se usa para enviar una respuesta al
 * cliente. Contiene métodos y propiedades que le permiten controlar la respuesta, como configurar el
 * código de estado, enviar datos JSON o redirigir al cliente a otra URL.
 */
const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoriaActualizada = await categoria.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (categoriaActualizada == null) {
    res.status(404).json({ msg: "Invalid id provided for categoria " + id });
  } else {
    res.json(categoriaActualizada);
  }
};

/**
 * La función `eliminarCategoria` es una función asíncrona que elimina una categoría al establecer su
 * propiedad `estado` en `false` y devuelve la categoría eliminada.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP realizada por el cliente. Incluye detalles como el método de solicitud, los
 * encabezados, los parámetros de consulta y el cuerpo de la solicitud.
 * @param [res] - El parámetro `res` es el objeto de respuesta que se usa para enviar una respuesta al
 * cliente. Es una instancia del objeto `respuesta` del marco Express.
 */
const eliminarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoriaBorrada = await categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  if (categoriaBorrada == null) {
    res.status(404).json({ msg: "Invalid id provided for categoria " + id });
  } else {
    res.json(categoriaBorrada);
  }
};

module.exports = {
  crearCateroria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
