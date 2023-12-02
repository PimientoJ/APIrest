const { Router } = require("express");
const ctrCalendar = require("../controllers/calendar.controller");
const autorizarUsuario = require("../middleware/auth.usuario");
const routerCalendar = Router();

routerCalendar.get("/datosCalendario", autorizarUsuario, ctrCalendar.obtenerDatosCalendario);
routerCalendar.post("/registarCalendario", ctrCalendar.agregarCalendario);
routerCalendar.put("/actualizarCalendario/:id", ctrCalendar.actualizarDatoCalendario);
routerCalendar.delete("/eliminarCalendario/:id", ctrCalendar.eliminarDatoCalendario);

module.exports = routerCalendar;