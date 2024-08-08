const Proyecto = require('../Models/Proyecto');
const path = require('path');
const fs = require('fs');
const guardarArchivo = require('../utils/guardar-archivo');
const guardarFormatoSolicitudDirector = require('../utils/formatoSolicitudDirector');

exports.obtenerProyecto = async (req, res) => {
    try {
        const proyecto = await Proyecto.find({ estado: true });
        res.json(proyecto);
    } catch (error) {
        res.json(error);
    }
};

exports.agregarProyecto = async (req, res) => {
    if (req.files) {
        const { titulo, fecha, proceso, estadoProceso, lineaInvestigacion, semilleroInvestigacion } = req.body;
        const tituloProyecto = req.body.titulo;
        //llamar al metodo de guardar archivo de solicitud de director y codirector
        //const respFormato = await guardarFormatoSolicitudDirector(req.files, tituloProyecto, "formatosolicituddirect", 'application/pdf');
        //const formatosolicituddirect = respFormato.nuevoNombreFormato;
        //llamar al metodo de guardar archivo
        const resp = await guardarArchivo(req.files, tituloProyecto, "nombreDocumento", 'application/pdf');
        const nombreDocumento = resp.nuevoNombre;

        if (resp.isOk) {
            try {
                const nuevoProyecto = new Proyecto({ titulo, fecha, proceso, estadoProceso, lineaInvestigacion, semilleroInvestigacion, nombreDocumento });
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
//Guardar archivo
exports.guardarDocumento = async (req, res) => {
    if (req.files) {
        const { titulo, fecha, director, codirecto, proceso, estadoProceso, lineaInvestigacion, semilleroInvestigacion } = req.body;
        console.log("body:", req.body);
        const tituloProyecto = req.body.titulo;
        //llamar al metodo de guardar archivo de solicitud de director y codirector
        //const respFormato = await guardarFormatoSolicitudDirector(req.files, tituloProyecto, "formatosolicituddirect", 'application/pdf');
        //const formatosolicituddirect = respFormato.nuevoNombreFormato;
        //llamar al metodo de guardar archivo
        const resp = await guardarArchivo(req.files, tituloProyecto, "nombreDocumento", 'application/pdf');
        const nombreDocumento = resp.nuevoNombre;

        if (resp.isOk) {
            try {
                const nuevoProyecto = new Proyecto({ titulo, fecha, director, codirecto, proceso, estadoProceso, lineaInvestigacion, semilleroInvestigacion, nombreDocumento });
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
exports.agregarUsuarioProyecto = async (req, res) => {
    try {
        const id = req.params.id;
        const { estudiante } = req.body;
        /* const proyecto = await Proyecto.find({ estado: true });
         for (let index = 0; index < proyecto.length; index++) {
             const element = proyecto[index].estudiante;
             console.log(element);
             // if(element.estudiante[_id] == estudiante )
             /*for (let index = 0; index < element.length; index++) {
                 console.log("2", element[index].estudiante);
                 const studen = element[index].estudiante;
                 console.log("studen", studen);
             }
         }*/
        const aggUsuario = await Proyecto.findByIdAndUpdate(id, { $push: { estudiante: estudiante } });
        res.json({ success: true, msj: "Usuario agregado con exito al proyecto" });
    } catch (error) {
        res.json(error);
    }
};
//Metodo para agregar el jurado al proyecto
exports.actualizarProyectoJurado = async (req, res) => {
    try {
        const id = req.params.id;
        const { jurado } = req.body;
        console.log(jurado)
        await Proyecto.findByIdAndUpdate(id, { $push: { jurado: jurado } });
        res.json({ success: true, msj: "Jurado Asignado Correctamente!" });
    } catch (error) {
        res.json(error);
    }

};
//Metodo para actualizar los datos
exports.actualizarProyecto = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await Proyecto.findByIdAndUpdate(id, data);
        res.json({ success: true, msj: "Datos recibidos para actualizar" });
    } catch (error) {
        res.json(error);
    }

};
exports.eliminarProyecto = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const eliminarProject = await Proyecto.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({ msj: "Dato eliminado satisfactoriamente", isOk: true });
    } catch (error) {
        res.status(200).json("Error");
    }

};
//Datos del usuario Logueado
exports.obtenerDatoProyectoid = async (req, res) => {
    try {
        const id = req.params.id;
        const proyecto = await Proyecto.findById(id);
        res.json(proyecto);
    } catch (error) {
        res.json(error);
    }
};
// obtner datos de los integrantes del proyecto
exports.obtenerDatoEstudianteProyecto = async (req, res) => {
    try {
        const id = req.params.id;
        const proyecto = await Proyecto.findById(id);
        res.json(proyecto.estudiante);
    } catch (error) {
        res.json(error);
    }
};
// obtner datos de los jueces del proyecto
exports.obtenerDatoJuradoProyecto = async (req, res) => {
    try {
        const id = req.params.id;
        const proyecto = await Proyecto.findById(id);
        res.json(proyecto.jurado);
    } catch (error) {
        res.json(error);
    }
};
/*exports.obtenerDatoProyectoPorNombre = async(req, res) => {
    try {

        const nombre = req.params.nombre;
        console.log(nombre);
        const proyecto = await Proyecto.find({ titulo: { $regex: nombre, $options: 'i' } });
        res.status(200).json(proyecto);

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}*/


exports.descargarArchivo = async (req, res) => {
    try {
      const id = req.params.id; // Obtener el ID del proyecto desde la URL
      const proyecto = await Proyecto.findById(id); // Buscar el proyecto por ID en la base de datos
  
      if (!proyecto) {
        console.log('Proyecto no encontrado');
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      if (!proyecto.nombreDocumento) {
        console.log('Nombre del documento no encontrado');
        return res.status(404).json({ error: 'Archivo no encontrado' });
      }
  
      const filePath = path.resolve(__dirname, 'APIrest', '../../../archivos', proyecto.nombreDocumento); // Construir la ruta absoluta del archivo
      console.log('Ruta del archivo:', filePath);
  
      if (fs.existsSync(filePath)) {
        console.log('Archivo encontrado. Iniciando descarga...');
        res.download(filePath, proyecto.nombreDocumento, (err) => {
          if (err) {
            console.error('Error al descargar el archivo:', err);
            res.status(500).json({ error: 'Error al descargar el archivo' });
          }
        });
      } else {
        console.log('Archivo no encontrado en el servidor');
        res.status(404).json({ error: 'Archivo no encontrado en el servidor' });
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  };