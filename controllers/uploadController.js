// controllers/uploadController.js
const registrarAtividade = (moderadorId, descricao) => {
  const dataAtual = new Date();
  db.query(
    "INSERT INTO atividades_moderador (moderador_id, descricao_atividade, data) VALUES (?, ?, ?)",
    [moderadorId, descricao, dataAtual]
  );
};

exports.uploadImagem = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada." });
  }
  res.status(200).json({
    mensagem: "Imagem salva com sucesso!",
    nome: req.file.filename,
    caminho: `/uploads/${req.file.filename}`,
  });

  if (req.usuario && req.usuario.perfil_id === 4) {
    registrarAtividade(
      req.usuario.id,
      `Enviou uma nova imagem: ${req.file.filename}`
    );
  }
};
