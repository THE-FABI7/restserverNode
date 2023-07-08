const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

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
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  if (_id && _id instanceof mongoose.Types.ObjectId) {
    user.uid = _id.toString();
  }
  return user;
};

module.exports = model("Users", userSchema);
