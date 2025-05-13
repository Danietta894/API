const db = require("../config/db");

exports.esqueciSenha = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email é obrigatório." });
  }

  const sql = "SELECT * FROM usuarios WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });

    // Mesmo que o e-mail não exista, retornamos mensagem de sucesso
    return res.json({
      message:
        "Se este e-mail estiver cadastrado, enviaremos um link de recuperação.",
    });
  });
};
