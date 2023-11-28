const { Schema, model } = require("mongoose");


const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});


module.exports = model("Usuario", UsuarioSchema);