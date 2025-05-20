const db = require("../config/db");

// Buscar imagens pendentes
exports.getImagensPendentes = (req, res) => {
  const sql = `
    SELECT f.*, u.nome AS nome_usuario
    FROM fotos f
    JOIN usuarios u ON f.usuario_id = u.id
    JOIN validacao v ON f.id = v.foto_id
    WHERE v.status = 'pendente'
  `;

  db.query(sql, (err, resultados) => {
    if (err) {
      console.error("Erro ao buscar imagens pendentes:", err);
      return res.status(500).json({ erro: "Erro ao buscar imagens pendentes" });
    }

    res.json(resultados);
  });
};


// Aprovar imagem
exports.aprovarImagem = (req, res) => {
  const imagemId = req.params.id;

  const sql = "UPDATE validacao SET status = 'aprovada' WHERE foto_id = ?";
  db.query(sql, [imagemId], (err) => {
    if (err) {
      console.error("Erro ao aprovar imagem:", err);
      return res.status(500).json({ erro: "Erro ao aprovar imagem" });
    }
    res.sendStatus(200);
  });
};

// Recusar imagem
exports.recusarImagem = (req, res) => {
  const imagemId = req.params.id;

  const sql = "UPDATE validacao SET status = 'recusada' WHERE foto_id = ?";
  db.query(sql, [imagemId], (err) => {
    if (err) {
      console.error("Erro ao recusar imagem:", err);
      return res.status(500).json({ erro: "Erro ao recusar imagem" });
    }
    res.sendStatus(200);
  });
};
