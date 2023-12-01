const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Nombre de usuario obligatorio"],
  },
  correoElectronico: {
    type: String,
    required: [true, "Correo obligatorio"],
  },
  contrasena: {
    type: String,
    required: [true, "Clave obligatoria"],
  },
  createdAt: Date,
});

UserSchema.pre("save", async function () {
  //generar sal
  const sal = await bcryptjs.genSalt(10);
  //encriptar la contraseña usando la
  this.contrasena = await bcryptjs.hash(this.contrasena, sal);
});
UserSchema.methods.comapararPassword = async function (password) {
  return await bcryptjs.compare(password, this.contrasena);
};
module.exports = mongoose.model("User", UserSchema);
