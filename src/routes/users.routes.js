const { Router } = require("express"); // se crea un objeto donde se instacia
const ctrUser = require("../controllers/users.controller");
const autorizarUsuario = require("../middleware/auth.usuario");
const routerUsers = Router(); // Objeto

routerUsers.get("/datosUsuario", ctrUser.obtenerDatosUsuario);
routerUsers.post("/registarUsuario", ctrUser.agregarUsuario);
routerUsers.put("/actualizarUsuario/:id", ctrUser.actualizarUsuario);
routerUsers.delete("/eliminarUsuario/:id", ctrUser.eliminarUsuario);
routerUsers.post("/loginUsuario", ctrUser.logginUsuario);

module.exports = routerUsers;