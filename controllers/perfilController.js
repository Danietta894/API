const db = require("../config/db");

// Listar perfis
exports.listarPerfis = (req, res) => {
    db.query("SELECT * FROM perfis", (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar perfis" });
        res.json(resultado);
    });
};

// Buscar um perfil por ID
exports.buscarPerfil = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM perfis WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar perfil" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Perfil não encontrado" });
        res.json(resultado[0]);
    });
};

// Criar um novo perfil
exports.criarPerfil = (req, res) => {
    const { nome } = req.body;

    if (!nome)
          return res.status(400).json({ erro: "Usuário e nome são obrigatórios" });

    db.query("INSERT INTO perfis ( nome) VALUES (?)",
        [nome], 
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: "Erro ao criar perfil" });
            res.status(201).json({ mensagem: "Perfil criado com sucesso!", id: resultado.insertId });
        }
    );
};

// Atualizar um perfil
exports.atualizarPerfil = (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    db.query("UPDATE perfis SET nome = ? WHERE id = ?", [nome, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao atualizar perfil" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Perfil não encontrado" });
        res.json({ mensagem: "Perfil atualizado com sucesso!" });
    });
};

// Deletar um perfil
exports.deletarPerfil = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM perfis WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao excluir perfil" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Perfil não encontrado" });
        res.json({ mensagem: "Perfil excluído com sucesso!" });
    });
};
