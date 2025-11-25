const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const verificaToken = require('../middleware/verificaToken'); // Middleware de segurança

// Rotas PÚBLICAS
router.get('/', produtoController.listarTodos); 
router.get('/:id', produtoController.buscarPorId); 

// Rotas PROTEGIDAS (exigem o Token JWT)
router.post('/', verificaToken, produtoController.criar);
router.put('/:id', verificaToken, produtoController.atualizar); 
router.delete('/:id', verificaToken, produtoController.deletar); 

module.exports = router;