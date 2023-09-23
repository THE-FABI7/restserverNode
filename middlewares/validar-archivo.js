const { response } = require('express')

const validarArchivoSubir = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length == 0 || !req.files.archivo) {
        res.status(400).send("No files were upload");
        return;
    }
    next();
}


module.exports = {
    validarArchivoSubir
}