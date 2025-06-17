const express = require("express");
const router = express.Router();
const validacaoController = require("../controllers/validacaoController");
const authMiddleware = require("../middleware/authMiddleware");

// Listar imagens pendentes
router.get(
  "/imagens/pendentes",
  authMiddleware.verificarToken, // ← Isso exige token
  validacaoController.getImagensPendentes
);


// Aprovar imagem
router.post(
  "/imagens/:id/aprovar",
  authMiddleware.verificarToken,
  validacaoController.aprovarImagem
);

// Recusar imagem
router.post(
  "/imagens/:id/recusar",
  authMiddleware.verificarToken,
  validacaoController.recusarImagem
);

module.exports = router;
