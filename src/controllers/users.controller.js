const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuario');


//Metodo de obtener los datos para ingreso al sistema
exports.obtenerDatosUsuario = async(req, res) => {
    try {
        const usuario = await Usuario.find({ estado: true });
        res.json(usuario);
    } catch (error) {
        res.json(error);
    }
};
//Método para enviar registros
exports.agregarUsuario = async(req, res) => {
    try {
        const { nombre, codigo, rol, correo, celular, pass } = req.body;
        console.log(req.body);

        const userExists = await Usuario.findOne({ correo: req.body.correo });
        if (userExists) {
            res.json({ msj: "El usuario ya existe con el ID de correo electrónico proporcionado" });
        } else {
            const salt = await bcrypt.genSalt(10);
            //Encriptamos la clave
            const hashedPass = await bcrypt.hash(req.body.pass, salt);
            req.body.pass = hashedPass;
            // const nuevoUsuario = new Usuario({ nombre, codigo, rol, correo, celular, pass })
            const nuevoUsuario = new Usuario(req.body);
            await nuevoUsuario.save(); //Guarda en la base de datos
            res.json({ success: true, msj: 'Usuario registrado exitosamente', data: nuevoUsuario })
        }

    } catch (error) {
        res.json(error);
    }

};
//Metodo para actualizar los datos
exports.actualizarUsuario = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await Usuario.findByIdAndUpdate(id, data);
        res.json({ msj: "Datos recibidos para actualizar" });
    } catch (error) {
        res.json(error);
    }

};
//Metodo para eliminar los datos usuario, solo se cambia el estado de el usuario a false
exports.eliminarUsuario = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const eliminar = await Usuario.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({ msj: "Dato eliminado satisfactoriamente", isOk: true });
    } catch (error) {
        res.status(200).json("Error");
    }

};
//Inicio de sesion de usuario
exports.logginUsuario = async(req, res) => {
    try {
        const { correo, pass, rol } = req.body;
        console.log(req.body);

        if (correo && pass) {
            //Comprobar si el usuario existe o no
            const userExist = await Usuario.findOne({ correo: req.body.correo });
            if (!userExist) {
                res.json({ success: false, msj: 'Usuario o contraseña incorrecta' });
            } else {
                //Comprobar coincidencia de contraseña
                const confirmarPass = await bcrypt.compare(pass, userExist.pass);
                if (confirmarPass) {
                    const { _id, correo } = userExist;
                    const opt = {
                        expiresIn: '1d'
                    }
                    const palabras = "clavesecreta"
                    const token = jwt.sign({ _id, correo }, palabras, opt);
                    res.json({ "token": token, success: true, msj: 'Inicio de sesion exitoso' });

                } else {
                    res.json({ token: null, success: false, msj: "Usuario o contraseña incorrecta" });
                }
            }
        }
    } catch (error) {
        res.json(error);
    }
};
//Datos del usuario Logueado
exports.obtenerDatosUsuarioLogueado = async(req, res) => {
    try {
        const usuario = await Usuario.find({ estado: true });
        res.json(usuario);
    } catch (error) {
        res.json(error);
    }
};

//Cambiar contraseña
exports.actualizarContraseña = async(req, res) => {
    try {
        const id = req.params.id;
        const { pass } = req.body;
        await Usuario.findByIdAndUpdate(id, pass);
        if (pass == confirmacionPass) {
            //Encriptamos la clave
            const hashed = await bcrypt.hash(pass, saltRound);
            console.log(hashed);
            res.json({ isOk: true, msj: "Contraseña modificada correctamente" });
        } else {
            //Envia msj de error
            res.json({ isOk: false, msj: "La contraseña y la confirmacion son incorrectas" });
        }
    } catch (error) {

    }
}