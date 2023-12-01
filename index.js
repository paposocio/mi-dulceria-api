// index.js
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require('cors');

//establecer configuraciones
dotenv.config({ path: "./config/.env" });

//crear el objeto express
const app = express();

//dependencia formateo body del json
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

//ejecucion conexion BD
connectDB()

//uri o ruta de prueba y definimos la accion que queremos que realice
app.get("/prueba", (request, response) => {
  //ejemplo de response o respuesta
  response.send("messi");
});

const productRoutes = require("./routes/productRoutes.JS");
app.use("/products", productRoutes);

const orderRoutes = require("./routes/orderRoutes.JS");
app.use("/orders", orderRoutes);

const userRoutes = require("./routes/userRoutes.js");
app.use("/auth", userRoutes);

//definir puerto del server
const puerto = process.env.PUERTO;

//definicion de server
app.listen(
  puerto,
  console.log(colors.bgYellow.bold(`Server ejecutandose en ${puerto}`))
);