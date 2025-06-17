const db = require("../config/db");

// Listar curtidas de uma foto
exports.listarCurtidas = (req, res) => {
    const { foto_id } = req.params;

    db.query("SELECT * FROM curtidas WHERE foto_id = ?", [foto_id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar curtidas" });
        res.json(resultado);
    });
};

exports.adicionarCurtida = (req, res) => {
    const { usuario_id, foto_id } = req.body;

    if (!usuario_id || !foto_id) {
        return res.status(400).json({ erro: "Usuário e foto são obrigatórios" });
    }

    db.query("INSERT INTO curtidas (usuario_id, foto_id) VALUES (?, ?)", [usuario_id, foto_id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao curtir a foto" });

        res.status(201).json({ mensagem: "Curtida adicionada com sucesso!", id: resultado.insertId });
    });
};


// Remover uma curtida
exports.removerCurtida = (req, res) => {
    const { usuario_id, foto_id } = req.body;

    if (!usuario_id || !foto_id) return res.status(400).json({ erro: "Usuário e foto são obrigatórios" });

    db.query("DELETE FROM curtidas WHERE usuario_id = ? AND foto_id = ?", [usuario_id, foto_id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao remover curtida" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Curtida não encontrada" });

        res.json({ mensagem: "Curtida removida com sucesso!" });
    });
};

// Contar número de curtidas de uma foto
exports.contarCurtidas = (req, res) => {
    const { foto_id } = req.params;

    db.query("SELECT COUNT(*) AS total FROM curtidas WHERE foto_id = ?", [foto_id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao contar curtidas" });
        res.json(resultado[0]);
    });
};
