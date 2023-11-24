const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Nombre del producto obligatorio"],
  },
  description: {
    type: String,
    required: [true, "Descripcion obligatoria"],
  },
  price: {
    type: Number,
    max: [100000, "Precio maximo de $100000"],
    min: [1000, "Precio minimo de $1000"],
    required: [true, "Precio obligatorio"],
  },
  region: {
    type: String,
    required: [true, "Region obligatoria"],
    enum: ["Andina", "Orinoquia", "Pacifica", "Caribe", "Amazonia"],
  },
  image: {
    type: String,
    required: [true, "Ruta obligatoria"],
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Vendedor obligatorio"],
  },
  createdAt: Date,
});

module.exports = mongoose.model("Product", ProductSchema);
