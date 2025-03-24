const express = require("express");
const router = express.Router();
const perfilController = require("../controllers/perfilController");

router.get("/perfis", perfilController.listarPerfis);
router.get("/perfis/:id", perfilController.buscarPerfil);
router.post("/perfis", perfilController.criarPerfil);
router.put("/perfis/:id", perfilController.atualizarPerfil);
router.delete("/perfis/:id", perfilController.deletarPerfil);

module.exports = router;

