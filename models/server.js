const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config.js");

class server {
  constructor() {
    this.app = express();

    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.conectarBb();
    this.midelwares();
    this.routes();
  }

  routes() {
    const userRoutes = require("../routes/user.js");
    const authRoutes = require("../routes/auth.js");
  
    this.app.use(this.usuariosPath, userRoutes);
    this.app.use(this.authPath, authRoutes);
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
