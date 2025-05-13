const db = require("../config/db");

// Listar todos os usuarios
exports.listarUsuarios = (req, res) => {
  db.query("SELECT * FROM usuarios", (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: "Erro ao buscar usuarios" });
    res.json(resultado);
  });
};

// Buscar um usuario por ID
exports.buscarUsuario = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM usuarios WHERE id = ?", [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: "Erro ao buscar usuario" });
    if (resultado.length === 0)
      return res.status(404).json({ erro: "usuario não encontrado" });
    res.json(resultado[0]);
  });
};

exports.criarUsuario = (req, res) => {
  const { nome, email, senha, perfil_id} = req.body;

  if (!nome || !email || !senha || !perfil_id) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }
  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (erro, resultado) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao verificar email" });
      if (resultado.length > 0)
        return res.status(409).json({ erro: "Email já cadastrado" });

      db.query(
        "INSERT INTO usuarios (nome, email, senha, perfil_id, data_cadastro) VALUES (?, ?, ?, ?, now())",
        [nome, email, senha, perfil_id],
        (erro, resultado) => {
          if (erro)
            return res.status(500).json({ erro: "Erro ao criar usuario" });

          res.status(201).json({
            mensagem: "usuario criado com sucesso!",
            id: resultado.insertId,
          });
        }
      );
    }
  );

  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (erro, resultado) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao verificar email" });
      if (resultado.length > 0)
        return res.status(409).json({ erro: "Email já cadastrado" });

      db.query(
        "INSERT INTO usuarios (nome, email, senha, perfil_id, data_cadastro) VALUES (?, ?, ?, ?, now())",
        [nome, email, senha, perfil_id],
        (erro, resultado) => {
          if (erro)
            return res.status(500).json({ erro: "Erro ao criar usuario" });

          res.status(201).json({
            mensagem: "usuario criado com sucesso!",
            id: resultado.insertId,
          });
        }
      );
    }
  );
};
exports.atualizarUsuario = (req, res) => {
  console.log(req.user);
  const id = req.user.id;
  const {
    nome,
    bio,
    interesses,
    projetos,
    localizacao,
  } = req.body;

  if (
    !nome ||
    !bio ||
    !interesses ||
    !projetos ||
    !localizacao
  ) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  db.query(
    "UPDATE usuarios SET nome = ?, bio = ?, interesses = ?, projetos = ?, localizacao = ? WHERE id = ?",
    [
      nome,
      bio,
      interesses,
      projetos,
      localizacao,
      id,
    ],
    (erro, resultado) => {
      console.log(erro);
      if (erro)
        return res.status(500).json({ erro: "Erro ao atualizar usuario" });
      if (resultado.affectedRows === 0)
        return res.status(404).json({ erro: "usuario não encontrado" });
      res.json({ mensagem: "usuario atualizado com sucesso!" });
    }
  );
};
exports.deletarUsuario = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM usuarios WHERE id = ?", [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: "Erro ao deletar usuario" });
    if (resultado.affectedRows === 0)
      return res.status(404).json({ erro: "usuario não encontrado" });
    res.json({ mensagem: "usuario deletado com sucesso!" });
  });
};
exports.buscarUsuarioeu = (req, res) => {
  console.log(req.user);
  const { id } = req.user; // Obtenha o ID do usuário a partir do token JWT

  db.query("SELECT * FROM usuarios WHERE id = ?", [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: "Erro ao buscar usuario" });
    if (resultado.length === 0)
      return res.status(404).json({ erro: "usuario não encontrado" });
    res.json(resultado[0]);
  });
};
