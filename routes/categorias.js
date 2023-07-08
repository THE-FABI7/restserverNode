const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares");
const { crearCateroria, obtenerCategoria, obtenerCategorias } = require("../controller/categoriasController");

const router = Router();

//obtener todas las categorias
router.get("/", obtenerCategorias)

//obtener una categoria en especifico con id -publico
router.get("/:id", obtenerCategoria);

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
router.put("/:id", (req, res) => {
  res.status(200).json({
    msg: "Put request",
  });
});

//Eliminar - Administrador -
router.delete("/:id", (req, res) => {
  res.status(200).json({
    msg: "Delete request",
  });
});

module.exports = router;
