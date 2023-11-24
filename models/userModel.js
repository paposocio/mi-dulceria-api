const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Nombre de usuario obligatorio"]
    },
    correoElectronico:{
        type:String,
        required:[true,"Correo obligatorio"]
    },
    contraseña:{
        type:String,
        required:[true,"Clave obligatoria"]
    },
    createdAt:Date
})  

module.exports = mongoose.model('User', UserSchema);