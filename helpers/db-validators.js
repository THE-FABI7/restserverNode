// En tu archivo de middlewares
const Role = require("../models/role");
const User = require("../models/user");
const Categoria = require("../models/categorias");
const { validationResult } = require("express-validator");

/**
 * La función `EsRolValido` comprueba si existe un rol determinado en la base de datos y devuelve un
 * error si no existe.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP realizada por el cliente. Incluye propiedades como los encabezados de la solicitud,
 * el cuerpo de la solicitud, el método de la solicitud, la URL de la solicitud, etc.
 * @param res - El parámetro `res` es el objeto de respuesta en Express.js. Se utiliza para enviar una
 * respuesta al cliente. En este fragmento de código, se usa para enviar una respuesta JSON con un
 * mensaje de error si el rol especificado no existe en la base de datos.
 * @param next - El parámetro `siguiente` es una función que se utiliza para pasar el control a la
 * siguiente función de middleware en el ciclo de solicitud-respuesta. Por lo general, se usa cuando
 * desea pasar al siguiente middleware o controlador después de realizar algunas operaciones en el
 * middleware actual. En este caso, se llama a `next()` después de verificar
 * @returns Si el rol no existe en la base de datos, se devolverá una respuesta con un código de estado
 * de 400 y un mensaje de error. Si el rol existe, la función llamará a `next()` para pasar el control
 * al siguiente middleware o controlador.
 */
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

/**
 * La función verifica si un correo electrónico dado ya está registrado en la base de datos y devuelve
 * un mensaje de error si lo está.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de la solicitud, el cuerpo de la solicitud y los
 * parámetros de la solicitud.
 * @param res - El parámetro `res` es el objeto de respuesta que se usa para enviar una respuesta al
 * cliente. Contiene métodos y propiedades que le permiten controlar la respuesta, como configurar el
 * código de estado, enviar datos JSON o redirigir al cliente a una URL diferente.
 * @param next - El parámetro `siguiente` es una función de devolución de llamada que se utiliza para
 * pasar el control a la siguiente función de middleware en el ciclo de solicitud-respuesta. Por lo
 * general, se usa para pasar a la siguiente función de middleware después de que la función de
 * middleware actual haya completado su tarea.
 * @returns Si `existeMailRegistrado` es verdadero (es decir, ya existe un usuario con el correo
 * electrónico dado), entonces la función devolverá una respuesta con el código de estado 400 y un
 * objeto JSON que contiene el mensaje "el correo ya está registrado". De lo contrario, la función
 * llamará a la función `next()`, lo que indica que el middleware se ha completado y se debe llamar al
 * siguiente middleware o controlador de ruta.
 */
const existeMail = async (req, res, next) => {
  const { correo } = req.body;
  const existeMailRegistrado = await User.findOne({ correo });

  if (existeMailRegistrado) {
    return res.status(400).json({ message: "el correo ya esta registrado" });
  }
  next();
};

/**
 * La función `existeUserPorId` verifica si un usuario con una identificación dada existe en la base de
 * datos y arroja un error si no es así.
 * @param id - El parámetro `id` es el identificador único del usuario que queremos comprobar si existe
 * en la base de datos.
 */
const existeUserPorId = async (id) => {
  const existeUser = await User.findById(id);

  if (!existeUser) {
    throw new Error("User already exists in database " + id + "!");
  }
  next();
};

const existeCategoriaPorId = async( id ) => {

  // Verificar si el correo existe
  const existeCategoria = await Categoria.findById(id);
  if ( !existeCategoria ) {
      throw new Error(`El id no existe ${ id }`);
  }
}


module.exports = {
  EsRolValido,
  existeMail,
  existeUserPorId,
  existeCategoriaPorId
};
