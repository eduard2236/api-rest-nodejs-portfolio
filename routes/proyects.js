'use strict'

var express = require('express');
var ProyectController = require('../controllers/proyects');
var correoController = require('../controllers/correoController')
/* var authController = require('../controllers/authController') */
const authRoutes = require('./auth.routes');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });
/* module.exports = (router) => {
    router.post('/registro', authController.registerUser);
    router.post('/login', authController.createUser);
} */
router.get('/home', ProyectController.home);
router.post('/test', ProyectController.test);
router.post('/save-project', ProyectController.saveProyect);
router.get('/project/:id?', ProyectController.getProyect);
router.get('/projects', ProyectController.getProyects);
router.put('/update/:id', ProyectController.updateProyect);
router.delete('/delete/:id', ProyectController.deleteProyect);
router.post('/upload-image/:id', multipartMiddleware, ProyectController.uploadImage);
router.get('/get-image/:image', ProyectController.getImageFile);
router.post('/envio', correoController.envioCorreo);

authRoutes(router);
router.get('/', (req, res) => {
  res.send('Hello from home');
});
module.exports = router;