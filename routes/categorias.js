const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, tieneRole, esAdminRole } = require("../middlewares");
const {
  crearCateroria,
  obtenerCategoria,
  obtenerCategorias,
  eliminarCategoria,
  actualizarCategoria,
} = require("../controller/categoriasController");

const router = Router();

//obtener todas las categorias
router.get("/", obtenerCategorias);

//obtener una categoria en especifico con id -publico
router.get("/:id", [
  check("id", "no es un id valido").isMongoId(),
  check("id", "no debe estar vacio").not().isEmpty(),
  validarCampos,
  obtenerCategoria,
]);

//crear nuevas categorias - privado -persona con cualquier token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "el nombre es requerida").not().isEmpty(),
    validarCampos,
  ],
  crearCateroria
);

//Actualizar - privado- cualquiera persona con token
router.put("/:id", [
  validarJWT,
  check("nombre", "el nombre es requerida").not().isEmpty(),
  validarCampos,
  actualizarCategoria,
]);

//Eliminar - Administrador -
router.delete("/:id", [
  validarJWT,
  check("id", "No es un id de Mongo").isMongoId(),
  esAdminRole,
  validarCampos,
  eliminarCategoria,
]);

module.exports = router;
