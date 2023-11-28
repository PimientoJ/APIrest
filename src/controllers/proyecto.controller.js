const Proyecto = require('../Models/Proyecto');

exports.obtenerProyecto = async(req, res) => {
    try {
        const proyecto = await Proyecto.find({ estado: true });
        res.json(proyecto);
    } catch (error) {
        res.json(error);
    }
};

exports.agregarProyecto = async(req, res) => {
    try {
        const { titulo, fecha, estudiante, jurado, director, codirecto } = req.body;
        console.log(titulo, fecha, estudiante, jurado, director, codirecto);

        const nuevoProyecto = new Proyecto({ titulo, fecha, estudiante, jurado, director, codirecto })
        await nuevoProyecto.save(); //Guarda en la base de datos

        res.json({ msj: "Datos recibidos satisfactoriamente", id: nuevoProyecto._id });
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