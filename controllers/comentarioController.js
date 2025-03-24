const db = require("../config/db");

// Listar todos os comentários
exports.listarComentarios = (req, res) => {
    db.query("SELECT * FROM comentarios", (erro, resultados) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar comentários" });
        res.json(resultados);
    });
};

// Buscar um comentário pelo ID
exports.buscarComentario = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM comentarios WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar comentário" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Comentário não encontrado" });
        res.json(resultado[0]);
    });
};

// Criar um novo comentário
exports.criarComentario = (req, res) => {
    const { usuario_id, foto_id, texto } = req.body;
    if (!usuario_id || !foto_id || !texto) return res.status(400).json({ erro: "Preencha todos os campos" });

    db.query("INSERT INTO comentarios (usuario_id, foto_id, texto) VALUES (?, ?, ?)", [usuario_id, foto_id, texto],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: "Erro ao salvar comentário" });
            res.status(201).json({ id: resultado.insertId, usuario_id, foto_id, texto });
        }
    );
};

// Atualizar um comentário
exports.atualizarComentario = (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;

    db.query("UPDATE comentarios SET texto = ? WHERE id = ?", [texto, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao atualizar o comentário" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Comentário não encontrado" });
        res.json({ mensagem: "Comentário atualizado com sucesso!" });
    });
};

// Excluir um comentário
exports.deletarComentario = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM comentarios WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao excluir o comentário" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Comentário não encontrado" });
        res.json({ mensagem: "Comentário excluído com sucesso!" });
    });
};
