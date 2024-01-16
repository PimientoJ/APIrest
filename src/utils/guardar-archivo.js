const guardarArchivo = async(file, nombreArchivo, tipoArchivo) => {

    const archivo = await file[nombreArchivo]; //Se parametriza con el nombre del documento
    console.log(archivo);
    const resp = { isOk: false, error: null, nuevoNombre: null };

    if (archivo.mimetype == tipoArchivo) {
        //Guardar Archivo
        const ahora = Date.parse(Date());
        console.log("ahora", ahora);
        resp.nuevoNombre = ahora + ".pdf";

        resp.error = await archivo.mv("./archivos/" + resp.nuevoNombre);
        if (resp.error) {
            return resp;
        } else {
            resp.isOk = true;
            return resp;
        }
    } else {
        resp.error = "Formato del archivo incorrecto, debe ser pdf"
        return resp;
    }
}

module.exports = guardarArchivo;