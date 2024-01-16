const { Router } = require("express");
const ctrEstudiante = require("../controllers/estudiante.controller");
const routerEstudiante = Router();

routerEstudiante.get("/datosEstudiante/:idProy", ctrEstudiante.ObtenerEstudiante);
routerEstudiante.post("/agregarEstudiante/:idProy", ctrEstudiante.AgregarEstudiante);

module.exports = routerEstudiante;