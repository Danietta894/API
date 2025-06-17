const express = require("express");
const router = express.Router();
const fotoController = require("../controllers/fotoController");
const { upload } = require("../middleware/uploadMiddleware");
const { verificarToken } = require("../middleware/authMiddleware");


router.post(
  "/",
  verificarToken,
  upload.single("imagem"),
  fotoController.criarFoto
);


router.get("/", fotoController.listarFotosAprovadas);


router.get("/eu", verificarToken, fotoController.listarFotosDoUsuario);


router.get(
  "/pendentes/eu",
  verificarToken,
  fotoController.listarFotosPendentesDoUsuario
);


router.get("/:id", fotoController.listarFotosPorId);

router.put("/:id", verificarToken, fotoController.atualizarFoto);


router.delete("/:id", verificarToken, fotoController.deletarFoto);

module.exports = router;
