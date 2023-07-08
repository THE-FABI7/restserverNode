const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config.js");

class server {
  constructor() {
    this.app = express();

    this.paths = {
      usuarios: "/api/usuarios",
      categorias: "/api/categorias",
      auth: "/api/auth",
    };

    // this.usuariosPath = "/api/usuarios";
    // this.authPath = "/api/auth";
    this.conectarBb();
    this.midelwares();
    this.routes();
  }

  routes() {
    const userRoutes = require("../routes/user.js");
    const authRoutes = require("../routes/auth.js");
    const CategoriasRoutes = require("../routes/categorias.js");

    this.app.use(this.paths.usuarios, userRoutes);
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.categorias, CategoriasRoutes);
  }

  async conectarBb() {
    await dbConnection();
  }

  midelwares() {
    //CORS
    this.app.use(cors());

    //Parseo y lectura del body
    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port` + process.env.PORT);
    });
  }
}

module.exports = server;
