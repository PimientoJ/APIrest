const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const conexionDB = require("./db.conexion");
const routerUser = require("./routes/users.routes");
const routerCalendar = require("./routes/calendars.routes");

//Configure los archivos dotenv

const app = express();

//Conexion a la base de datos
conexionDB();

//settings
app.set("name", "APIrest");
app.set("port", process.env.PORT || 3500);

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: ['http://localhost:4200'],

}));
/*app.use = cors((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");  
    next();
});*/

//Llamado de rutas
app.use(express.static("public"));
app.use("/api/seira", routerUser);
app.use("/api", routerCalendar);

module.exports = app;