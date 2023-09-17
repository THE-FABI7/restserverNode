const express = require("express");
const path = require('path')


const cargarArchivo = (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length == 0 || !req.files.archivo) {
    res.status(400).send("No files were upload");
    return;
  }
  const{ archivo} = req.files;

  const uploadFiles =  path.join(   __dirname ,'../uploads/' , archivo.name);

  archivo.mv(uploadFiles, (err) =>{
     if(err){
            return res.status(500).json({err})

     }
     res.json({ msg: 'file uploads  to: ' + uploadFiles})

  })

  console.log()



};

module.exports = {
  cargarArchivo,
};
