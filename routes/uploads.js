const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {cargarArchivo, actualizarImagen} = require('../controller/uploads')
const {coleccionesPermitidas} = require('../controller/buscarController');
const { validarArchivoSubir } = require("../middlewares/validar-archivo");

const router = Router();


router.post("/", cargarArchivo);
// ruta para acrualizar imagenes de los usuarios
router.put("/:coleccion/:id", [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, [users, productos])),
    //validarCampos
], actualizarImagen)


module.exports = router;
