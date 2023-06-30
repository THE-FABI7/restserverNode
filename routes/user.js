const { Router } = require("express");
const { usersGet, userPost, usersPut, usersDelete, usersPatch } = require('../controller/userController');

const router = Router();


router.get("/", usersGet);


router.post("/", userPost);

router.put("/:id", usersPut);

router.delete("/", usersDelete);

router.patch("/", usersPatch);

module.exports = router;
