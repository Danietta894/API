// controllers/uploadController.js

exports.uploadImagem = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada." });
  }

  // Você pode salvar o nome do arquivo no banco, se quiser

  res.status(200).json({
    mensagem: "Imagem salva com sucesso!",
    nome: req.file.filename,
    caminho: `/uploads/${req.file.filename}`,
  });
};
