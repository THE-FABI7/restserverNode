const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {cargarArchivo, actualizarImagen, mostrarImagen} = require('../controller/uploads')
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
//ruta para mostrar las imagenes de las colecciones
router.get("/:coleccion/:id", [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, [users, productos])),
    //validarCampos
], mostrarImagen)





module.exports = router;
