const express = require("express");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const router = express.Router();

//uri de Todos los usuarios
router.get("/", async (request, response) => {
  const users = await User.find();
  //escenario 1: no hay usuarios en la bd
  if (users.length > 0) {
    //hay usuarios en la bd
    response.status(200).json({
      success: true,
      data: users,
    });
  } else {
    //no hay usuarios en la bd
    response.status(404).json({
      success: false,
      msg: "No hay usuarios registrados",
    });
  }
});

//uri de usuarios por id
router.get("/:id", async (request, response) => {
  const userid = request.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return response.status(500).json({
        success: false,
        msg: "Id invalido",
      });
    } else {
      const user = await User.findById(userid);
      if (!user) {
        response.status(404).json({
          success: false,
          msg: "Usero no encontrado",
        });
      } else {
        response.status(200).json({
          success: true,
          data: user,
        });
      }
      return response.json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

//uri de crear usuario
router.post("/", async (request, response) => {
  try {
    //guardar User que viene de body
    const newUser = await User.create(request.body);

    return response.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      data: `Error encontrado: ${error.message}`,
    });
  }
});

//actualizar usuario por id
router.put("/", async (request, response) => {
  const userid = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return response.status(500).json({
      success: false,
      msg: "Id invalido",
    });
  }

  const user = await User.findById(userid);

  if (!user) {
    return response.status(404).json({
      success: false,
      msg: "User no encontrado",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(userid, request.body, {
    new: true,
    options: {
      returnDocument: "after",
    },
  });

  response.status(200).json({
    success: true,
    data: updatedUser,
  });
});

//eliminar usuario por id
router.delete("/:id", async (request, response) => {
  const userid = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return response.status(500).json({
      success: false,
      msg: "Id invalido",
    });
  }

  const user = await User.findById(userid);

  if (!user) {
    return response.status(404).json({
      success: false,
      msg: "Usuario no encontrado",
    });
  }

  await User.deleteOne({ _id: userid });

  return response.json({
    success: true,
    message: "Usuario eliminado con id: " + userid,
  });
});

module.exports = router;
