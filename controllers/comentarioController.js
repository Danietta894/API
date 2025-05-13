const db = require("../config/db");

// Listar todos os comentários
const listarComentarios = (req, res) => {
  const foto_id = req.query.foto_id;
  if (foto_id) {
    db.query(
      "SELECT usuarios.nome, comentarios.data_comentario, comentarios.id, comentarios.usuario_id, comentarios.texto FROM comentarios, usuarios WHERE foto_id = ? AND comentarios.usuario_id = usuarios.id",
      [foto_id],
      (erro, resultados) => {
        console.log(erro);
        if (erro)
          return res.status(500).json({ erro: "Erro ao buscar comentários" });
        res.json(resultados);
      }
    );
    return;
  }
  db.query("SELECT * FROM comentarios", (erro, resultados) => {
    if (erro)
      return res.status(500).json({ erro: "Erro ao buscar comentários" });
    res.json(resultados);
  });
};

// Buscar um comentário pelo ID
const buscarComentario = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM comentarios WHERE id = ?",
    [id],
    (erro, resultado) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao buscar comentário" });
      if (resultado.length === 0)
        return res.status(404).json({ erro: "Comentário não encontrado" });
      res.json(resultado[0]);
    }
  );
};

// Criar um novo comentário
const criarComentario = (req, res) => {
  const { foto_id, texto } = req.body;
  const usuario_id = req.user?.id;

  console.log(usuario_id, req.user);

  if (!foto_id || !texto)
    return res
      .status(400)
      .json({ erro: "Preencha todos os campos obrigatórios." });

  db.query(
    "INSERT INTO comentarios (usuario_id, foto_id, texto, data_comentario) VALUES (?, ?, ?, NOW())",
    [usuario_id, foto_id, texto],
    (erro, resultado) => {
      console.log(erro);

      if (erro)
        return res.status(500).json({ erro: "Erro ao salvar comentário" });
      res
        .status(201)
        .json({ id: resultado.insertId, usuario_id, foto_id, texto });
    }
  );
};

// Atualizar um comentário
const atualizarComentario = (req, res) => {
  const { id } = req.params;
  const { texto } = req.body;

  db.query(
    "UPDATE comentarios SET texto = ? WHERE id = ?",
    [texto, id],
    (erro, resultado) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao atualizar o comentário" });
      if (resultado.affectedRows === 0)
        return res.status(404).json({ erro: "Comentário não encontrado" });
      res.json({ mensagem: "Comentário atualizado com sucesso!" });
    }
  );
};

// Excluir um comentário
const deletarComentario = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM comentarios WHERE id = ?", [id], (erro, resultado) => {
    if (erro)
      return res.status(500).json({ erro: "Erro ao excluir o comentário" });
    if (resultado.affectedRows === 0)
      return res.status(404).json({ erro: "Comentário não encontrado" });
    res.json({ mensagem: "Comentário excluído com sucesso!" });
  });
};

// ✅ Exportar todos os métodos corretamente
module.exports = {
  listarComentarios,
  buscarComentario,
  criarComentario,
  atualizarComentario,
  deletarComentario,
};
