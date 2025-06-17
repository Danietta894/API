const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Usuario = require("../models/usuarios");

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  console.log("Dados de login recebidos:", { email, senha });
  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    console.log("Usuário encontrado:", usuario);
    if (!usuario) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log("Senha válida:", senhaValida);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: usuario.id, perfil_id: usuario.perfil_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      perfil_id: usuario.perfil_id,
      nome: usuario.nome,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro no servidor." });
  }
};

exports.loginGoogle = async (req, res) => {
  const profile = req.user;

  if (!profile) {
    return res.status(400).json({ error: "Perfil do Google não encontrado" });
  }

  const email = profile.email;
  const nome = profile.displayName;

  try {
    let usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      const senhaCriptografada = await bcrypt.hash(profile.id, 10);

      usuario = await Usuario.create({
        nome,
        email,
        senha: senhaCriptografada,
        perfil_id: 3,
      });
    }

    const token = jwt.sign(
      { id: usuario.id, perfil_id: usuario.perfil_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.redirect(
      `http://localhost:3001/login-success?token=${token}&name=${encodeURIComponent(
        nome
      )}`
    );
  } catch (error) {
    console.error("Erro no login com Google:", error);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ error: "Nome, e-mail e senha são obrigatórios." });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      perfil_id: 3,
    });

    return res.json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro no servidor." });
  }
};

exports.logout = (req, res) => {
  res.json({ message: "Logout realizado com sucesso!" });
};

exports.esqueciSenha = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "E-mail é obrigatório." });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    return res.json({
      message:
        "Se este e-mail estiver cadastrado, enviaremos um link de recuperação.",
    });
  } catch (error) {
    console.error("Erro no esqueciSenha:", error);
    return res.status(500).json({ error: "Erro no servidor." });
  }
};
