const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config.js");
const fileUpload = require("express-fileupload");

class server {
  constructor() {
    this.app = express();

    this.paths = {
      usuarios: "/api/usuarios",
      categorias: "/api/categorias",
      productos: "/api/productos",
      auth: "/api/auth",
      buscar: "/api/buscar",
      uploads: "/api/uploads",
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
    const productosRoutes = require("../routes/productos.js");
    const buscarRoutes = require("../routes/buscar.js");
    const upload = require("../routes/uploads.js");

    this.app.use(this.paths.usuarios, userRoutes);
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.categorias, CategoriasRoutes);
    this.app.use(this.paths.productos, productosRoutes);
    this.app.use(this.paths.buscar, buscarRoutes);
    this.app.use(this.paths.uploads, upload);
  }

  async conectarBb() {
    await dbConnection();
  }

  midelwares() {
    //CORS
    this.app.use(cors());

    //Parseo y lectura del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));

    this.app.use(fileUpload({
       useTempFiles: true,
       tempFileDir: '/tmp/'     

    })
    );
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port` + process.env.PORT);
    });
  }
}

module.exports = server;
