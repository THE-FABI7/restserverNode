const express = require("express");
const cors = require("cors");

class server {
  constructor() {
    this.app = express();

    this.usuariosPath = "/api/usuarios";

    this.midelwares();
    this.routes();
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/user.js'));
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
