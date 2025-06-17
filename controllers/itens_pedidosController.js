const db = require("../config/db");

// Listar todos os itens_pedidos
exports.listaritens_pedidos = (req, res) => {
    db.query("SELECT * FROM itens_pedidos", (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar itens_pedidos" });
        res.json(resultado);
    });
};

// Buscar um itens_pedidos por ID
exports.buscaritens_pedidos = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM itens_pedidos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar itens_pedidos" });
        if (resultado.length === 0) return res.status(404).json({ erro: "itens_pedidos não encontrado" });
        res.json(resultado[0]);
    });
}

exports.criarIntens_pedidos = (req, res) => {
    const {pedido_id, produto_id, quantidade, preco_unitario, subtotal } = req.body;

    if (!pedido_id || !produto_id || !quantidade || !preco_unitario || !subtotal)
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });  

    db.query(
        "INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
        [pedido_id, produto_id, quantidade, preco_unitario, subtotal],
        (erro, resultado) => {
            console.log(erro);
            if (erro) return res.status(500).json({ erro: "Erro ao criar itens_pedidos" });

            res.status(201).json({ mensagem: "Itens_pedidos criado com sucesso!", id: resultado.insertId });
        }
    );
};


// Atualizar itens_pedidos
exports.atualizarItens_pedidos = (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;

    if (!quantidade) return res.status(400).json({ erro: "Os campos 'quantidade' são obrigatórios" });

    db.query("UPDATE itens_pedidos SET quantidade = ?, subtotal = ? * preco_unitario WHERE id = ?", [quantidade, quantidade, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao atualizar itens_pedidos" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "itens_pedidos não encontrado" });
        res.json({ mensagem: "itens_pedidos atualizado com sucesso!" });
    });
}

// Deletar itens_pedidos
exports.deletaritens_pedidos = (req, res) => {
    const { id } = req.params;

    console.log(id);

    db.query("DELETE FROM itens_pedidos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao excluir itens_pedidos" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "itens_pedidos não encontrado" });
        res.json({ mensagem: "itens_pedidos excluído com sucesso!" });
    });
}