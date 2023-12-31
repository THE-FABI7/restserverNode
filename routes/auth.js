const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controller/auth");
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
router.post(
  "/google",
  [
    check("id_token", "el id token es necesario").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);

module.exports = router;
