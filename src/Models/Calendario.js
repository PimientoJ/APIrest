const { Schema, model } = require("mongoose");

const CalendarioSchema = new Schema({
    periodo: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    proceso: {
        type: String,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    fechaSesioncomite: {
        type: Date,
        required: true
    },
    fechaResultado: {
        type: Date,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});


module.exports = model("Calendario", CalendarioSchema);