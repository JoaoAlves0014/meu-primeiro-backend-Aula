const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.registrar); // Registro
router.post('/login', usuarioController.login); // Login

module.exports = router;