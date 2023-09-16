const express = require('express')



const cargarArchivo  = (req, res) => {

    res.json({
        "message": "Carga de archivo correcta",
    })
}



module.exports = {
    cargarArchivo
}