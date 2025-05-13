const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verificarToken, verificarPermissao } = require('../middleware/authMiddleware');

// Rotas de Autenticação
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.post('/esquecisenha', authController.esqueciSenha);
// Rota protegida (somente usuários autenticados podem acessar)
router.get('/perfil', verificarToken, (req, res) => {
    res.json({ message: "Bem-vindo ao seu perfil!", usuario: req.user });
});

// Rota protegida para administradores
router.get('/admin', verificarToken, verificarPermissao([5]), (req, res) => {
    res.json({ message: "Bem-vindo ao painel administrativo!" });
});

module.exports = router;
