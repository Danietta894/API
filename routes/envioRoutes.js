const express = require("express");
const router = express.Router();
const envioController = require("../controllers/envioController");

router.get("/envios", envioController.listarEnvios);
router.get("/envios/:id", envioController.buscarEnvio);
router.post("/envios", envioController.criarEnvio);
router.put("/envios/:id", envioController.atualizarEnvio);
router.delete("/envios/:id", envioController.deletarEnvio);

module.exports = router;
