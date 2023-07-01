const { Router } = require("express");
const {
  usersGet,
  userPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require("../controller/userController");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

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
    check("rol", "el rol no es valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos

],
  userPost
);

router.put("/:id", usersPut);

router.delete("/", usersDelete);

router.patch("/", usersPatch);

module.exports = router;
