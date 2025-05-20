const db = require("../config/db");

exports.listarAtividades = (req, res) => {
  const { moderadorId } = req.params;

  db.query(
    "SELECT * FROM atividades_moderador WHERE moderador_id = ? ORDER BY data DESC",
    [moderadorId],
    (erro, resultados) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao buscar atividades" });
      res.json(resultados);
    }
  );
};


