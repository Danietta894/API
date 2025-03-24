const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");

router.get("/comentarios", comentarioController.listarComentarios);
router.get("/comentarios/:id", comentarioController.buscarComentario);
router.post("/comentarios", comentarioController.criarComentario);
router.put("/comentarios/:id", comentarioController.atualizarComentario);
router.delete("/comentarios/:id", comentarioController.deletarComentario);

module.exports = router;
