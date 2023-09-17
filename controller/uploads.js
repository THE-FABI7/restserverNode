const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const cargarArchivo = (req, res) => {
  if (!req.files || Object.keys(req.files).length == 0 || !req.files.archivo) {
    res.status(400).send("No files were upload");
    return;
  }
  const { archivo } = req.files;
  const nombreCortado = archivo.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1];

  //extensiones validas
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({
      msg: "el tipo de extension utilizada no es permitida",
    });
  }
  
  const nombreTemp = uuidv4() + "." + extension;
  const uploadFiles = path.join(__dirname, "../uploads/", nombreTemp);

  archivo.mv(uploadFiles, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.json({ msg: "file uploads  to: " + uploadFiles });
  });
};

module.exports = {
  cargarArchivo,
};
