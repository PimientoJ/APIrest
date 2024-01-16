const { Schema, model } = require("mongoose");
const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    codigo: {
        type: Number,
        required: true
    },
    rol: [{
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        autopopulate: true
    }],
    correo: {
        type: String,
        required: true
    },
    celular: {
        type: Number,
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

UsuarioSchema.plugin(require('mongoose-autopopulate'));
module.exports = model("Usuario", UsuarioSchema);