'use strict'
var express = require('express');
//YA  no hace falta la dependencia body-parser porque express la tiene embebida
/* var bodyParser = require('body-parser'); */
var app = express();
let cors = require('cors')
const bodyparser = require('body-parser');
//cargar archivos de rutas
var proyect_routes = require('./routes/proyects');
//middlewares
/* este es una configuracion necesaria para la dependencia bodyParser */
//app.use(express.urlencoded({extended:true}));
/* este middlewares convierte todo lo que llega atraves de una peticion en JSON */

app.use(express.json());

// Configurar cabeceras y cors
app.use(cors());
/* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); */
// 

//rutas
app.use('/api', proyect_routes);
//exportar 
module.exports = app;
