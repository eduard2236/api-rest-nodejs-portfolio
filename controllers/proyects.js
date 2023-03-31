'use strict'
var Proyect = require('../models/proyects');
var fs = require('fs');
var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el metodo o accion test de'
        })

    },

    saveProyect: async function (req, res) {
        var proyect = new Proyect();
        var params = req.body;
        proyect.name = params.name;
        proyect.description = params.description;
        proyect.category = params.category;
        proyect.year = params.year;
        proyect.langs = params.langs;
        proyect.image = null;


        try {
            await proyect.save();
            return res.status(200).send({ proyect });
        } catch (err) {
            return res.status(500).send({ message: "error al guardar el objeto", error: err });
        }
    },
    getProyect: async function (req, res) {
        var proyectId = req.params.id;
        let proyect;
        if (proyectId == null) return res.status(404).send({ message: 'el proyecto no existe' })
        try {
            proyect = await Proyect.findById(proyectId);
            return res.status(200).send({ proyect });
        } catch (err) {
            return res.status(404).send({ message: 'el proyecto no existe', error: err });
        }
    },
    getProyects: async function (req, res) {
        try {
            let proyects = await Proyect.find({}).sort('-year').exec();
            if (!proyects) return res.status(404).send({ message: 'no hay proyectos para mostrar' });
            return res.status(200).send({ proyects });
        } catch (err) {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos', error: err });
        }
    },
    updateProyect: async function (req, res) {
        var proyectId = req.params.id;
        let proyect = req.body;
        if (proyectId == null) return res.status(404).send({ message: 'el proyecto no existe' })
        try {
            proyect = await Proyect.findByIdAndUpdate(proyectId, proyect, { new: true });
            return res.status(200).send({ proyect });
        } catch (err) {
            if (err) return res.status(404).send({ message: 'error al ingresar los datos', error: err });
        }
    },
    deleteProyect: async function (req, res) {
        var proyectId = req.params.id;
        if (proyectId == null) return res.status(404).send({ message: 'el proyecto no existe' });
        try {
            let proyectDelete = await Proyect.findByIdAndDelete(proyectId).sort('-year').exec();
            return res.status(200).send({ message: 'se ha eliminado el registro correctamente' });
        } catch (err) {
            if (err) return res.status(404).send({ message: 'error al borrar los datos', error: err });
        }
    },
    uploadImage: async function (req, res) {
        var proyectId = req.params.id;
        let proyectImage;
        if (proyectId == null) return res.status(404).send({ message: 'el proyecto no existe' });
        if (req.files) {
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
            if(fileExt== 'png ' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                try {
                    proyectImage = await Proyect.findByIdAndUpdate(proyectId, { image: fileName }, { new: true });
                    return res.status(200).send({ proyectImage });
                } catch (err) {
                    return res.status(404).send({ message: 'error al cargar la imagen', error: err });
                }
            }else{
                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({message: 'La extension no es valida'});
                });
            }
            
        }

    }
};

module.exports = controller;