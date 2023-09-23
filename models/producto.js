const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  nombre: { type: String, required: true, unique: true },
  estado: { type: Boolean, default: true, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: { type: String},
  disponible: {type: Boolean, default: true},
  img: {type: String}
});

ProductSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;

};

module.exports = model("Producto", ProductSchema);
