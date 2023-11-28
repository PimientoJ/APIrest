const { Schema, model } = require("mongoose");


const ProyectoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    estudiante: {
        type: String,
        required: true
    },
    jurado: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    codirecto: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
});


module.exports = model("Proyecto", ProyectoSchema);