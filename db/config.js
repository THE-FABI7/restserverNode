const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODBCONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    });

    console.log("Base de datos online")


  } catch (e) {
    throw new Error(" Mongoose connection error: " + e.message || e);
  }
};

module.exports = {
  dbConnection,
};
