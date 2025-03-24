const express = require("express");
const router = express.Router();
const curtidaController = require("../controllers/curtidaController");

router.get("/curtidas/:foto_id", curtidaController.listarCurtidas);
router.post("/curtidas", curtidaController.adicionarCurtida);
router.delete("/curtidas", curtidaController.removerCurtida);
router.get("/curtidas/contar/:foto_id", curtidaController.contarCurtidas);

module.exports = router;
