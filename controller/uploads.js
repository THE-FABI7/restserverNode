const express = require("express");
const { subirArchivo } = require("../helpers/subir-archivos");

const cargarArchivo = async (req, res) => {
  if (!req.files || Object.keys(req.files).length == 0 || !req.files.archivo) {
    res.status(400).send("No files were upload");
    return;
  }

  const nombre = await subirArchivo(req.files);

  res.json({
    nombre,
  });
};

module.exports = {
  cargarArchivo,
};
