const { Schema, model } = require("mongoose");

const userSchema = Schema({
  nombre: {
    type: "string",
    required: [true, "The user name is required"],
  },
  correo: {
    type: "string",
    required: [true, "The mailaddress is required"],
    unique: true,
  },
  password: { type: "string", required: [true, "The password is required"] },
  img: { type: "string" },
  rol: {
    type: "string",
    required: [true, "The rol is required"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: { type: Boolean, required: true },
  google: { type: Boolean, default: false },
});

module.exports = model("Users", userSchema);
