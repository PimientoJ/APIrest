const Proyecto = require('../Models/Proyecto');
const guardarArchivo = require('../utils/guardar-archivo');

exports.obtenerProyecto = async(req, res) => {
    try {
        const proyecto = await Proyecto.find({ estado: true });
        res.json(proyecto);
    } catch (error) {
        res.json(error);
    }
};

exports.agregarProyecto = async(req, res) => {
    if (req.files) {
        //llamar al metodo de guardar archivo
        const resp = await guardarArchivo(req.files, "archivo", 'application/pdf');
        const nombreDocumento = resp.nuevoNombre;

        if (resp.isOk) {
            try {
                const { titulo, fecha, director, codirecto, proceso, estadoProceso } = req.body;
                const nuevoProyecto = new Proyecto({ titulo, fecha, director, codirecto, proceso, estadoProceso, nombreDocumento });
                console.log("nuevoProyecto", nuevoProyecto);
                await nuevoProyecto.save(); //Guarda en la base de datos
                res.json({ success: true, msj: 'Proyecto registrado exitosamente', data: nuevoProyecto })
            } catch (error) {
                res.json(error);
            }
        } else {
            res.json({ error: resp.error })
        }

    } else {
        res.json({ error: "Debe adjuntar el archivo pdf" });
    }
};
//Metodo para agregar el usuario al proyecto
exports.agregarUsuarioProyecto = async(req, res) => {
    try {
        const id = req.params.id;
        const { estudiante } = req.body;
        const aggUsuario = await Proyecto.findByIdAndUpdate(id, { $push: { estudiante: estudiante } });
        res.json({ msj: "Usuario agregado con exito al proyecto" });
    } catch (error) {
        res.json(error);
    }
};
//Metodo para actualizar los datos
exports.actualizarProyecto = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await Proyecto.findByIdAndUpdate(id, data);
        res.json({ msj: "Datos recibidos para actualizar" });
    } catch (error) {
        res.json(error);
    }

};
exports.eliminarProyecto = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const eliminarProject = await Proyecto.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({ msj: "Dato eliminado satisfactoriamente", isOk: true });
    } catch (error) {
        res.status(200).json("Error");
    }

};