const colors = require("colors");
const mongoose = require("mongoose");

//funcion para conectarse a la bd
async function connectDB() {
  const conexion = await mongoose.connect(process.env.MONGO_URL);
  console.log(`Conexion exitosa a mongoDB: ${conexion.connection.host}`.bgCyan.blue);
}

module.exports = connectDB