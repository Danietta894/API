const db = require("../config/db");

// Listar todos os pedidos
exports.listarPedidos = (req, res) => {
    db.query("SELECT * FROM pedidos", (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar pedidos" });
        res.json(resultado);
    });
};

// Buscar um pedido por ID
exports.buscarPedido = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM pedidos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar pedido" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Pedido não encontrado" });
        res.json(resultado[0]);
    });
};

exports.criarPedido = (req, res) => {
    const {usuario_id, status, total, data_pedido } = req.body;

    if ( !usuario_id || !status || !total|| !data_pedido)
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    db.query(
        "INSERT INTO pedidos (usuario_id, status, total, data_pedido) VALUES (?, ?, ?, ?)",
        [ usuario_id, status, total, data_pedido],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: "Erro ao criar pedido" });

            res.status(201).json({ mensagem: "Pedido criado com sucesso!", id: resultado.insertId });
        }
    );
};
exports.buscarPedidoPorId = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM pedidos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar pedido" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Pedido não encontrado" });
        res.json(resultado[0]);
    });
}


// Atualizar um pedido
exports.atualizarPedido = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !id ) return res.status(400).json({ erro: "O campo 'status' é obrigatório" });

    db.query("UPDATE pedidos SET status = ? WHERE id = ?", [status, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao atualizar pedido" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Envio não encontrado" });
        res.json({ mensagem: "Pedido atualizado com sucesso!" });
    });
};

// Deletar um pedido
exports.deletarPedido = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM pedidos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao excluir pedido" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Pedido não encontrado" });
        res.json({ mensagem: "Pedido excluído com sucesso!" });
    });
};
