const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid: uid.toString() }; // Asegurarse de que uid sea una cadena
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h',
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = generarJWT;
