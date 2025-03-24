const db = require("../config/db");

// Listar todos os envios
exports.listarEnvios = (req, res) => {
    db.query("SELECT * FROM envios", (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar envios" });
        res.json(resultado);
    });
};

// Buscar um envio por ID
exports.buscarEnvio = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM envios WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar envio" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Envio não encontrado" });
        res.json(resultado[0]);
    });
};

exports.criarEnvio = (req, res) => {
    const { pedido_id, endereco, status, data_envio, data_entrega } = req.body;

    if (!pedido_id || !endereco || !status || !data_envio || !data_entrega)
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    db.query(
        "INSERT INTO envios (pedido_id, endereco, status, data_envio, data_entrega) VALUES (?, ?, ?, ?, ?)",
        [pedido_id, endereco, status, data_envio, data_entrega],
        (erro, resultado) => {
            console.log(erro);
            if (erro) return res.status(500).json({ erro: "Erro ao criar envio" });

            res.status(201).json({ mensagem: "Envio criado com sucesso!", id: resultado.insertId });
        }
    );
};


// Atualizar um envio
exports.atualizarEnvio = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ erro: "O campo 'status' é obrigatório" });

    db.query("UPDATE envios SET status = ? WHERE id = ?", [status, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao atualizar envio" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Envio não encontrado" });
        res.json({ mensagem: "Envio atualizado com sucesso!" });
    });
};

// Deletar um envio
exports.deletarEnvio = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM envios WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao excluir envio" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Envio não encontrado" });
        res.json({ mensagem: "Envio excluído com sucesso!" });
    });
};
