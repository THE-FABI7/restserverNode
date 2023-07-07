const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controller/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "el correo es requerido").isEmail(),
    check("password", " la password es requerido").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
