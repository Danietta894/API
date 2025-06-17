const db = require("../config/db"); // Ajuste o caminho conforme seu projeto

const express = require("express");
const router = express.Router();
const atividadeController = require("../controllers/atividadeController");
const db = require("../config/db");

exports.listarAtividades = (req, res) => {
  const { moderadorId } = req.params;

  db.query(
    "SELECT * FROM atividades_moderador WHERE moderador_id = ? ORDER BY data DESC LIMIT 10",
    [moderadorId],
    (erro, resultados) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao buscar atividades" });
      res.json(resultados);
    }
  );
};


router.get("/:moderadorId", atividadeController.listarAtividades);

module.exports = router;

// router.get("/atividades", (req, res) => {
//   const sql = `
