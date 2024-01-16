const { Router } = require("express"); // se crea un objeto donde se instacia
const ctrProyecto = require("../controllers/proyecto.controller");
const ctrUser = require("../controllers/users.controller");
const routerProyecto = Router(); // Objeto

routerProyecto.get("/datosproyecto", ctrProyecto.obtenerProyecto);
routerProyecto.post("/registarProyecto", ctrProyecto.agregarProyecto);
routerProyecto.put("/registarUsuarioProyecto/:id", ctrProyecto.agregarUsuarioProyecto);
routerProyecto.put("/actualizarProyecto/:id", ctrProyecto.actualizarProyecto);
routerProyecto.delete("/eliminarProyecto/:id", ctrProyecto.eliminarProyecto);
routerProyecto.get("/datosNombreUser/:nombre", ctrUser.obtenerNombresUsuario);

module.exports = routerProyecto;