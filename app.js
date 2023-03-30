'use strict'
var express = require('express');
//YA  no hace falta la dependencia body-parser porque express la tiene embebida
/* var bodyParser = require('body-parser'); */
var app = express();
//cargar archivos de rutas

//middlewares
/* este es una configuracion necesaria para la dependencia bodyParser */
app.use(express.urlencoded({extended:true}));
/* este middlewares convierte todo lo que llega atraves de una peticion en JSON */
app.use(express.json());

//CORS

//rutas
app.get('/', (req, res) =>{
    res.status(200).send('<h1> Pagina de Inicio</h1>');
});
app.post('/test/:id', (req, res) =>{
    //params trae los parametros de la url/:id, body los de la peticion o formulario , query.web parametro opcional
    console.log(req.body.nombre);
    console.log(req.query.web);
    console.log(req.params.id);
    res.status(200).send({
        message: 'Hola mundo desde una API de NodeJS'
    });
});
//exportar 
module.exports = app;
