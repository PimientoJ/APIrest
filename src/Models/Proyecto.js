const { Schema, model } = require("mongoose");


const ProyectoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    estudiante: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        autopopulate: true
    }],
    jurado: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        autopopulate: true
    }],
    director: {
        type: String
    },
    codirecto: {
        type: String
    },
    proceso: {
        type: String,
        required: true
    },
    lineaInvestigación: {
        type: String,
    },
    semilleroInvestigacion: {
        type: String
    },
    estadoProceso: {
        type: String,
        required: true
    },
    nombreDocumento: {
        type: String,
        required: true
    },
    nota: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
});

ProyectoSchema.plugin(require('mongoose-autopopulate'));
module.exports = model("Proyecto", ProyectoSchema);