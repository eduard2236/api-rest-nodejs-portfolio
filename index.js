'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/portfolio')
        .then(()=>{
            console.log("Conexion a la base de datos establecida con exito...");
        })
        .catch(err => console.log(err));