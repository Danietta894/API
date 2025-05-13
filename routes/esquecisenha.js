const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const esqueciSenhaController = require("../controllers/esquecisenha"); // Importa aqui 👈

// Rotas
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.post("/esquecisenha", esqueciSenhaController.esqueciSenha); // Usa o controller novo 👈

module.exports = router;
