const response = require('express');
const express = require("express");
const path = require('path')
const fs = require('fs')
const { subirArchivo } = require("../helpers/subir-archivos");
const Usuario = require('../models/user');
const Producto = require('../models/producto')

/**
 * La función `cargarArchivo` es una función asincrónica que maneja la carga de archivos y devuelve el
 * nombre del archivo cargado.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como encabezados, parámetros de consulta y datos del cuerpo. En este caso,
 * se utiliza para acceder a los archivos cargados.
 * @param res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Es una instancia del objeto Express `Response`.
 * @returns una respuesta JSON con el nombre del archivo subido.
 */
const cargarArchivo = async (req, res) => {

  try {
    const nombre = await subirArchivo(req.files, undefined, "imgs");

    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};


/**
 * La función `actualizarImagen` toma un objeto de solicitud y respuesta, extrae los parámetros `id` y
 * `coleccion` de la solicitud y envía una respuesta JSON con los valores extraídos.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP realizada por el cliente. Incluye detalles como los encabezados de la solicitud, el
 * método de la solicitud, la URL de la solicitud, el cuerpo de la solicitud y otra información
 * relevante.
 * @param res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar una respuesta
 * al cliente. Contiene métodos y propiedades que le permiten controlar la respuesta, como el método
 * `json()` utilizado en el ejemplo para enviar una respuesta JSON.
 */
const actualizarImagen = async (req, res) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'users':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break;

    default:
      return res.status(400).json({
        msg: 'La coleccion no esta permitida'
      })
  }

  //limpiar imagenes previas 
  if (modelo.img) {

    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen)

    }

  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();


  res.json(modelo);
};


//implementar la funcion de mostrarImagen que mostrara la imagen del usuario o producto en el front
const mostrarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'users':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break;

    default:
      return res.status(400).json({
        msg: 'La coleccion no esta permitida'
      })
  }


  if (modelo.img) {

    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen)

    }

  }

  res.json({ msg: 'falta place holder' });

}


module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen
};



