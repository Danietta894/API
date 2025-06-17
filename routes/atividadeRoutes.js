const express = require("express");
const router = express.Router();
const atividadeController = require("../controllers/atividadeController");


router.get("/:moderadorId", atividadeController.listarAtividades);

module.exports = router;
