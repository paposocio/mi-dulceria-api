const express = require("express");
const Product = require("../models/productModel");
const { default: mongoose } = require("mongoose");

const router = express.Router();

//uri de Todos los productos
router.get("/", async (request, response) => {
  const products = await Product.find();
  //escenario 1: no hay productos en la bd
  if (products.length > 0) {
    //hay productos en la bd
    response.status(200).json({
      success: true,
      data: products,
    });
  } else {
    //no hay productos en la bd
    response.status(404).json({
      success: false,
      msg: "No hay productos registrados",
    });
  }
});

//uri de productos por id
router.get("/:id", async (request, response) => {
  const productid = request.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(productid)) {
      return response.status(500).json({
        success: false,
        msg: "Id invalido",
      });
    } else {
      const product = await Product.findById(productid);
      if (!product) {
        response.status(404).json({
          success: false,
          msg: "Producto no encontrado",
        });
      } else {
        response.status(200).json({
          success: true,
          data: product,
        });
      }
      return response.json({
        success: true,
        data: product,
      });
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

//uri de crear producto
router.post("/register", async (request, response) => {
  try {
    //guardar Product que viene de body
    const newProduct = await Product.create(request.body);

    return response.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      data: `Error encontrado: ${error.message}`,
    });
  }
});

//actualizar producto por id
router.put("/update/:id", async (request, response) => {
  const productid = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(productid)) {
    return response.status(500).json({
      success: false,
      msg: "Id invalido",
    });
  }

  const product = await Product.findById(productid);

  if (!product) {
    return response.status(404).json({
      success: false,
      msg: "Product no encontrado",
    });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productid,
    request.body,
    {
      new: true,
      options: {
        returnDocument: "after",
      },
    }
  );

  response.status(200).json({
    success: true,
    data: updatedProduct,
  });
});

//eliminar producto por id
router.delete("/delete/:id", async (request, response) => {
  const productid = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(productid)) {
    return response.status(500).json({
      success: false,
      msg: "Id invalido",
    });
  }

  const product = await Product.findById(productid);

  if (!product) {
    return response.status(404).json({
      success: false,
      msg: "Producto no encontrado",
    });
  }

  await Product.deleteOne({ _id: productid });

  return response.json({
    success: true,
    message: "Producto eliminado con id: " + productid,
  });
});

module.exports = router;
