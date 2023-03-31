'use strict'

var express = require('express');
var ProyectController = require('../controllers/proyects');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

router.get('/home',ProyectController.home);
router.post('/test',ProyectController.test);
router.post('/save-project',ProyectController.saveProyect);
router.get('/project/:id?',ProyectController.getProyect);
router.get('/projects',ProyectController.getProyects);
router.put('/update/:id',ProyectController.updateProyect);
router.delete('/delete/:id',ProyectController.deleteProyect);
router.post('/upload-image/:id',multipartMiddleware, ProyectController.uploadImage);
module.exports = router;