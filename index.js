'use strict'

var mongoose = require('mongoose');
// importar variables de entorno
require('dotenv').config({path: 'variables.env'});

const host= process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 3700;

var app = require('./app');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL)
        .then(()=>{
            console.log("Conexion a la base de datos establecida con exito...");

            //creacion del servidor
            app.listen(port, host, () =>{
                console.log('Servidor corriendo correctamente ');
            })
        })
        .catch(err => console.log(err));