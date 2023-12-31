const { Router } = require("express");
const {
  usersGet,
  userPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require("../controller/userController");
const { check } = require("express-validator");

const router = Router();
const {
  EsRolValido,
  existeMail,
  existeUserPorId,
} = require("../helpers/db-validators");
const {
  validarJWT,
  esAdminRole,
  tieneRole,
  validarCampos,
} = require("../middlewares");

router.get("/", usersGet);

router.post(
  "/",
  [
    check("nombre", "el nombre es requerido").not().isEmpty(),
    check(
      "password",
      "la contraseña debe de ser de al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "el correo no es valido").isEmail(),
    existeMail,
    EsRolValido,
    validarCampos,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "No es un Id valido").isMongoId(),
    validarCampos,
    check("id").custom(existeUserPorId),
    EsRolValido,
  ],
  usersPut
);

router.delete(
  "/:id",
  validarJWT,
  // esAdminRole,
  tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
  check("id", "No es un Id valido").isMongoId(),
  validarCampos,
  check("id").custom(existeUserPorId),
  usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
