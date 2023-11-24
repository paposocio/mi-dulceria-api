const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
  clientName: {
    type: String,
    required: [true, "Nombre obligatorio"],
  },
  shippingAddress: [
    {
      address: {},
      city: {},
      department: {},
      postCode: {},
    },
  ],
  clientPhone: {
    type: Number,
    required: [true, "Telefono obligatorio"],
  },
  clientEmail: {
    type: String,
    required: [true, "Correo obligatorio"],
  },
  aditionalInfo: {
    type: String,
  },
  products: [
    {
      productName: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  paymentMethod: {
    type: String,
    required: [true, "Region obligatoria"],
    enum: ["PSE", "Contraentrega", "Paypal"],
  },
  shippingType: {
    type: String,
    required: [true, "Tipo de envio obligatorio"],
    enum: ["Envio gratis", "Flete", "Contraentrega"],
  },
  total: Number,
  createdAt: Date,
});

module.exports = mongoose.model("Order", OrderSchema);
