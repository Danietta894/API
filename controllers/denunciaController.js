const db = require("../config/db");

// Listar denuncia
exports.listarDenuncia = (req, res) => {
    db.query("SELECT * FROM denuncia", (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar denuncia" });
        res.json(resultado);
    });
};

// Buscar denuncia por ID
exports.buscarDenuncia = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM denuncia WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar denuncia" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Denúncia não encontrada" });
        res.json(resultado[0]);
    });
};

exports.criarDenuncia = (req, res) => {
    const {usuario_id, tipo, referencia_id, motivo, status, data_denuncia } = req.body;

    if ( !usuario_id || !tipo || !referencia_id|| !motivo || !status || !data_denuncia)     
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    db.query(
        "INSERT INTO denuncia (usuario_id, tipo, referencia_id, motivo, status, data_denuncia) VALUES (?, ?, ?, ?, ?, ?)",
        [ usuario_id, tipo, referencia_id, motivo, status, data_denuncia],
        (erro, resultado) => {
            console.log(erro);
            if (erro) return res.status(500).json({ erro: "Erro ao criar denúncia!" });

            res.status(201).json({ mensagem: "Denúncia criada com sucesso!", id: resultado.insertId });
        }
    );
};
exports.buscarDenunciaPorId = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM denuncia WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar moderracao" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Denúncia não encontrada" });
        res.json(resultado[0]);
    });
}


// Atualizar um denuncia
exports.atualizarDenuncia = (req, res) => {
    const { id } = req.params;
    const {motivo, status} = req.body;

    if (!motivo || !status || !id) 
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    db.query("UPDATE denuncia SET motivo = ?, status = ? WHERE id = ?",
        [ motivo, status, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao atualizar denúncia" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "denúncia não encontrada!" });
        res.json({ mensagem: "Denúncia atualizado com sucesso!" });
    });
};

// Deletar denuncia
exports.deletarDenuncia = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM denuncia WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao excluir denuncia" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Denúncia não encontrado" });
        res.json({ mensagem: "Denúncia excluído com sucesso!" });
    });
};

