const Proyecto = require('../Models/Proyecto');

exports.ObtenerEstudiante = async(req, res) => {

    try {
        if (req.params.idProy) {
            const idProy = req.params.idProy;
            const proyecto = await Proyecto.findById(idProy);
            res.json(proyecto.estudiante);
        } else {
            res.status(400).json({ error: 'Se debe enviar el id del estudiante' });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.AgregarEstudiante = async(req, res) => {

    try {
        if (req.params.idProy && req.body) {
            const idProy = req.params.idProy;
            const estudiante = req.body;
            console.log(idProy, estudiante);
            const proyecto = await Proyecto.findById(idProy);
            proyecto.estudiante.push(estudiante); //agg un nuevo objeto en el arreglo de calendario
            await proyecto.save();
            res.json({ isOk: true, msj: "Estudiante agregado al proyecto" });
        } else {
            res.status(400).json({ error: 'Datos incompletos del estudiante' });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}