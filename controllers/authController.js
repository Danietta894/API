const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


exports.login = (req, res) => {
  const { email, senha } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });
    if (result.length === 0)
      return res.status(401).json({ error: "Usuário não encontrado" });

    const usuario = result[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: "Senha incorreta" });

    const token = jwt.sign(
      { id: usuario.id, perfil_id: usuario.perfil_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, perfil_id: usuario.perfil_id, nome: usuario.nome });
  });
};

exports.loginGoogle = async (req, res) => {
  const profile = req.user;

  const email = profile.email;
  const nome = profile.displayName;

  const senhaCriptografada = await bcrypt.hash(profile.id, 10);
  const sqlVerificaEmail = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sqlVerificaEmail, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar email" });
    if (result.length > 0) {
      const usuario = result[0];

      const token = jwt.sign(
        { id: usuario.id, perfil_id: usuario.perfil_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.redirect(
        `http://localhost:3001/login-success?token=${token}&name=${encodeURIComponent(
          profile.displayName
        )}`
      );
    } else {
      const sql =
        "INSERT INTO usuarios (nome, email, senha, perfil_id) VALUES (?, ?, ?, 3)";
      db.query(sql, [nome, email, senhaCriptografada], (err, result) => {
        if (err)
          return res.status(500).json({ error: "Erro ao criar usuário" });

        db.query(sqlVerificaEmail, [email], async (err, result) => {
          if (err)
            return res.status(500).json({ error: "Erro ao verificar email" });
          if (result.length > 0) {
            const usuario = result[0];

            const token = jwt.sign(
              { id: usuario.id, perfil_id: usuario.perfil_id },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );

            return res.redirect(
              `http://localhost:3001/login-success?token=${token}&name=${encodeURIComponent(
                profile.displayName
              )}`
            );
          }
        });
      });
    }
  });


};


exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const sqlVerificaEmail = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sqlVerificaEmail, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar email" });
    if (result.length > 0)
      return res.status(400).json({ error: "E-mail já cadastrado" });

    const sql =
      "INSERT INTO usuarios (nome, email, senha, perfil_id) VALUES (?, ?, ?, 3)";
    db.query(sql, [nome, email, senhaCriptografada], (err, result) => {
      if (err) return res.status(500).json({ error: "Erro ao criar usuário" });
      res.json({ message: "Usuário registrado com sucesso!" });
    });
  });
};

// Logout (Simples)
exports.logout = (req, res) => {
  res.json({ message: "Logout realizado com sucesso!" });
};

// Esqueci Minha Senha
exports.esqueciSenha = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email é obrigatório." });
  }

  const sql = "SELECT * FROM usuarios WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });

    // Mesmo que o e-mail não exista, não informamos por segurança
    return res.json({
      message:
        "Se este e-mail estiver cadastrado, enviaremos um link de recuperação.",
    });
  });
};
