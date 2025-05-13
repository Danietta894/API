const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");
const { verificarToken } = require("../middleware/authMiddleware");

router.get("/", comentarioController.listarComentarios);
router.get("/:id", comentarioController.buscarComentario);
router.post("/", verificarToken, comentarioController.criarComentario);
router.put("/:id", verificarToken, comentarioController.atualizarComentario);
router.delete("/:id", verificarToken, comentarioController.deletarComentario);

module.exports = router;
