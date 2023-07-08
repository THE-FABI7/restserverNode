const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//obtener todas las categorias
router.get("/", (req, res) => {
  res.status(200).json({
    msg: "Todo esta funcionando",
  });
});

//obtener una categoria en especifico con id -publico
router.get("/:id", (req, res) => {
  res.status(200).json({
    msg: "Todo esta funcionando",
  });
});

//crear nuevas categorias - privado -persona con cualquier token valido
router.post("/", (req, res) => {
  res.status(200).json({
    msg: "POST request",
  });
});

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
