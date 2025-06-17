const express = require("express");
const router = express.Router();
const fotoController = require("../controllers/fotoController");
const { upload } = require("../middleware/uploadMiddleware");
const { verificarToken } = require("../middleware/authMiddleware");

router.post(
  "/fotos",
  verificarToken,
  upload.single("imagem"),
  fotoController.criarFoto
);
router.get("/fotos", fotoController.listarFotosAprovadas); // galeria
router.get("/fotos/eu", verificarToken, fotoController.listarFotosDoUsuario); // meu perfil
router.put("/fotos/:id", fotoController.atualizarFoto);
router.delete("/fotos/:id", fotoController.deletarFoto);
router.get("/fotos/:id", fotoController.listarFotosporid);
router.get(
  "/fotos/pendentes/eu",
  verificarToken,
  fotoController.listarFotosPendentesDoUsuario
);


module.exports = router;
