const express = require("express");
const Order = require("../models/orderModel");
const { default: mongoose } = require("mongoose");

const router = express.Router();
 
//uri de Todos las ordenes
router.get("/", async (request, response) => {
  const orders = await Order.find();
  //escenario 1: no hay ordenes en la bd
  if (orders.length > 0) {
    //hay ordenes en la bd
    response.status(200).json({
      success: true,
      data: orders,
    });
  } else {
    //no hay ordenes en la bd
    response.status(404).json({
      success: false,
      msg: "No hay ordenes registradas",
    });
  }
});

//uri de ordenes por id
router.get("/:id", async (request, response) => {
  const orderid = request.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(orderid)) {
      return response.status(500).json({
        success: false,
        msg: "Id invalido",
      });
    } else {
      const order = await Order.findById(orderid);
      if (!order) {
        response.status(404).json({
          success: false,
          msg: "Orden no encontrada",
        });
      } else {
        response.status(200).json({
          success: true,
          data: order,
        });
      }
      return response.json({
        success: true,
        data: order,
      });
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

//uri de crear orden
router.post("/", async (request, response) => {
  try {
    //guardar orden que viene de body
    const newOrder = await Order.create(request.body);

    return response.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      data: `Error encontrado: ${error.message}`,
    });
  }
});

//actualizar ordero por id
router.put("/", async (request, response) => {
  const orderid = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderid)) {
    return response.status(500).json({
      success: false,
      msg: "Id invalido",
    });
  }

  const order = await Order.findById(orderid);

  if (!order) {
    return response.status(404).json({
      success: false,
      msg: "Order no encontrado",
    });
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderid,
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
    data: updatedOrder,
  });
});

//eliminar ordero por id
router.delete("/:id", async (request, response) => {
  const orderid = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderid)) {
    return response.status(500).json({
      success: false,
      msg: "Id invalido",
    });
  }

  const order = await Order.findById(orderid);

  if (!order) {
    return response.status(404).json({
      success: false,
      msg: "Orden no encontrada",
    });
  }

  await Order.deleteOne({ _id: orderid });

  return response.json({
    success: true,
    message: "Orden eliminada con id: " + orderid,
  });
});

module.exports = router;
