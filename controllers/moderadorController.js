const db = require("../config/db");

exports.listarAtividades = async (req, res) => {
  const usuarioId = req.user.id;

  const sql = `
    SELECT atividades_moderador.id,
   atividades_moderador.moderador_id,
    atividades_moderador.descricao_atividade,
    atividades_moderador.data
FROM atividades_moderador, moderador
where atividades_moderador.moderador_id = moderador.id
AND moderador.usuario_id = ?;

  `;

  db.query(sql, [usuarioId], (err, resultados) => {
    if (err) {
      console.trace(err); // LOG DO ERRO NO SERVIDOR
      return res.status(500).json({ erro: "Erro ao buscar atividades" });
    }
    res.json(resultados);
  });
};
