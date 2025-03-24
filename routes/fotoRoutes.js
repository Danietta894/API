const express = require("express");
const router = express.Router();
const fotoController = require("../controllers/fotoController");

router.post("/fotos", fotoController.criarFoto);
router.get("/fotos", fotoController.listarFotos);
router.put("/fotos/:id", fotoController.atualizarFoto);
router.delete("/fotos/:id", fotoController.deletarFoto);
router.get("/fotos/:id", fotoController.listarFotosporid);



module.exports = router;

