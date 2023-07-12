const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProductos,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  obtenerProducto,
} = require("../controller/productoController");
const { validarJWT, tieneRole, validarCampos } = require("../middlewares");
const {
  existeCategoriaPorId,
  existeUserPorId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id", "No existe id en la base de datos").custom(existeUserPorId),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJWT,
    tieneRole("USER_ROLE", "VENTAS_ROLE"),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    validarCampos,
  ],
  agregarProducto
);

router.put(
  "/",
  [
    validarJWT,
    check("nombre", "el nombre es necesario").not().isEmpty(),
    check("id").custom(existeUserPorId),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  [
    "/:id",
    validarJWT,
    tieneRole("USER_ROLE"),
    check("id", "el id debe ser valido").isMongoId(),
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
