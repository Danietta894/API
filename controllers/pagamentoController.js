const db = require("../config/db");

// Listar todos os pagamentos
exports.listarPagamentos = (req, res) => {
    db.query("SELECT * FROM pagamentos", (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar pagamentos" });
        res.json(resultado);
    });
};

// Buscar um pagamento por ID
exports.buscarPagamento = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM pagamentos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar pagamento" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Pagamento não encontrado" });
        res.json(resultado[0]);
    });
};

exports.criarPagamento = (req, res) => {
    const {pedido_id, metodo_pagamento, status, data_pagamento } = req.body;

    if ( !pedido_id || !metodo_pagamento || !status || !data_pagamento)
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    db.query(
        "INSERT INTO pagamentos (pedido_id, metodo_pagamento, status, data_pagamento) VALUES (?, ?, ?, ?)",
        [ pedido_id, metodo_pagamento, status, data_pagamento],
        (erro, resultado) => {
            console.log(erro);
            if (erro) return res.status(500).json({ erro: "Erro ao criar pagamento" });

            res.status(201).json({ mensagem: "Pagamento criado com sucesso!", id: resultado.insertId });
        }
    );
};
exports.buscarPagamentoPorId = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM pagamentos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar pagamento" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Pagamento não encontrado" });
        res.json(resultado[0]);
    });
}


// Atualizar um pagamento
exports.atualizarPagamento = (req, res) => {
    const { id } = req.params;
    const { pedido_id } = req.body;
    const { metodo_pagamento } = req.body;
    const { status } = req.body;
    const { data_pagamento } = req.body;

    if (!id || !pedido_id || !metodo_pagamento || !status  || !data_pagamento ) return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    db.query("UPDATE pagamentos SET pedido_id = ?, metodo_pagamento = ?, status = ?, data_pagamento = ? WHERE id = ?", [pedido_id, metodo_pagamento, status, data_pagamento, id], (erro, resultado) => {
        console.log(erro);
        if (erro) return res.status(500).json({ erro: "Erro ao atualizar pagamento" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "pagamento não encontrado!" });
        res.json({ mensagem: "Pagamento atualizado com sucesso!" });
    });
};

// Deletar um pagamento
exports.deletarPagamento = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM pagamentos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao excluir pagamento" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Pagamento não encontrado" });
        res.json({ mensagem: "Pagamento excluído com sucesso!" });
    });
};

