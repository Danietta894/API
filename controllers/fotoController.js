const db = require("../config/db");

// Criar nova foto
exports.criarFoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada." });
  }

  const { descricao, localizacao, longitude, latitude, fotografado_em } =
    req.body;

  if (
    !descricao ||
    !localizacao ||
    !longitude ||
    !latitude ||
    !fotografado_em
  ) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  try {
    const query = `
      INSERT INTO fotos (url, descricao, tipo, usuario_id, localizacao, longitude, latitude, fotografado_em)
      VALUES (?, ?, '', ?, ?, ?, ?, ?)
    `;
    const valores = [
      `/uploads/${req.file.filename}`,
      descricao,
      req.user.id,
      localizacao,
      longitude,
      latitude,
      fotografado_em,
    ];

    db.query(query, valores, (erro, resultado) => {
      if (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao salvar a foto" });
      }

      const fotoId = resultado.insertId;

      const insertValidacao = `
        INSERT INTO validacao (foto_id, moderador_id, status)
        VALUES (?, NULL, 'pendente')
      `;

      db.query(insertValidacao, [fotoId], (errValidacao) => {
        if (errValidacao) {
          console.error("Erro ao criar validação:", errValidacao);
          return res
            .status(500)
            .json({ erro: "Erro ao criar validação da imagem" });
        }

        res.status(201).json({ id: fotoId, ...req.body });
      });
    });
  } catch (erro) {
    console.error("Erro no servidor:", erro);
    return res.status(500).json({ erro: "Erro no servidor" });
  }
};

// Listar fotos aprovadas (para galeria pública)
exports.listarFotosAprovadas = (req, res) => {
  const { pagina = 1, limite = 10, tipo ="" } = req.query;
  const query = ` 
    SELECT f.*, u.nome AS nome_usuario
    FROM fotos f
    JOIN validacao v ON f.id = v.foto_id
    JOIN usuarios u ON f.usuario_id = u.id
    WHERE v.status = 'aprovada'
    ${tipo ? "AND f.tipo = ?" : ""}
    limit ? offset ?
  `;
  const offset = (+limite * (+pagina - 1));
  const valores = tipo ? [tipo, +limite, offset] : [+limite, offset];

console.log("limi offset", [+limite, +limite * (+pagina - 1)]);
  db.query(query,valores, (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar fotos aprovadas:", erro);
      return res.status(500).json({ erro: "Erro ao buscar as fotos" });
    }
    res.json(resultados);
  });
};

// Listar fotos do usuário logado
exports.listarFotosDoUsuario = (req, res) => {
  const query = "SELECT * FROM fotos WHERE usuario_id = ?";

  db.query(query, [req.user.id], (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar fotos do usuário:", erro);
      return res.status(500).json({ erro: "Erro ao buscar as fotos" });
    }
    res.json(resultados);
  });
};

exports.listarFotosPendentesDoUsuario = (req, res) => {
  const query = `SELECT f.* 
  FROM fotos f
  JOIN validacao v ON f.id = v.foto_id
    WHERE v.status = 'pendente'
   and f.usuario_id = ?`;

  db.query(query, [req.user.id], (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar fotos do usuário:", erro);
      return res.status(500).json({ erro: "Erro ao buscar as fotos" });
    }
    res.json(resultados);
  });
};
// Buscar uma foto por ID
exports.listarFotosporid = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM fotos WHERE id = ?";

  db.query(query, [id], (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar foto por ID:", erro);
      return res.status(500).json({ erro: "Erro ao buscar a foto" });
    }
    res.json(resultados[0] || {});
  });
};

// Atualizar uma foto
exports.atualizarFoto = (req, res) => {
  const { id } = req.params;
  const { url, descricao, tipo } = req.body;

  const query = `
    UPDATE fotos SET url = ?, descricao = ?, tipo = ? WHERE id = ?
  `;
  const valores = [url, descricao, tipo, id];

  db.query(query, valores, (erro) => {
    if (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao atualizar a foto" });
    }
    res.json({ mensagem: "Foto atualizada com sucesso!" });
  });
};

// Excluir uma foto
exports.deletarFoto = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM fotos WHERE id = ?";

  db.query(query, [id], (erro) => {
    if (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao excluir a foto" });
    }
    res.json({ mensagem: "Foto excluída com sucesso!" });
  });
};
