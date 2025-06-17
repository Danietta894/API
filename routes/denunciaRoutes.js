const express = require("express");
const router = express.Router();
const DenunciaController = require("../controllers/denunciaController");

// Definição das rotas
router.post("/", DenunciaController.criarDenuncia);
router.get("/", DenunciaController.listarDenuncia);
router.get("/:id", DenunciaController.buscarDenunciaPorId);
router.put("/:id", DenunciaController.atualizarDenuncia);
router.delete("/:id", DenunciaController.deletarDenuncia);

module.exports = router;
