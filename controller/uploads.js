const express = require("express");
const { subirArchivo } = require("../helpers/subir-archivos");

const cargarArchivo = async (req, res) => {
  if (!req.files || Object.keys(req.files).length == 0 || !req.files.archivo) {
    res.status(400).send("No files were upload");
    return;
  }

  try {
    const nombre = await subirArchivo(req.files, undefined, 'imgs');

    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({msg})
  }
};

module.exports = {
  cargarArchivo,
};
