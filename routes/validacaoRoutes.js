const express = require("express");
const router = express.Router();
const validacaoController = require("../controllers/validacaoController");
const authMiddleware = require("../middleware/authMiddleware");


router.get(
  "/pendentes",
  authMiddleware.verificarToken, 
  validacaoController.getImagensPendentes
);



router.post(
  "/:id/aprovar",
  authMiddleware.verificarToken,
  validacaoController.aprovarImagem
);


router.post(
  "/:id/recusar",
  authMiddleware.verificarToken,
  validacaoController.recusarImagem
);

module.exports = router;
