const db = require("../config/db");

// Listar todos os produtos
exports.listarProdutos = (req, res) => {
    db.query("SELECT * FROM produtos", (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar produtos" });
        res.json(resultado);
    });
};

// Buscar um produto por ID
exports.buscarProduto = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM pordutos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar produto" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json(resultado[0]);
    });
};

exports.criarProduto = (req, res) => {
    const {nome, descricao, preco, estoque, imagem_url, categoria, data_criacao } = req.body;

    if ( !nome || !descricao || !preco|| !data_criacao || !estoque || !imagem_url || !categoria)
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    db.query(
        "INSERT INTO produtos (nome, descricao, preco, estoque, imagem_url, categoria, data_criacao) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [ nome  , descricao, preco, estoque, imagem_url, categoria, data_criacao],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: "Erro ao criar produto" });

            res.status(201).json({ mensagem: "Produto criado com sucesso!", id: resultado.insertId });
        }
    );
};
exports.buscarProdutoPorId = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM produtos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar produto" });
        if (resultado.length === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json(resultado[0]);
    });
}


// Atualizar um produto
exports.atualizarProduto = (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const { descricao } = req.body;
    const { preco } = req.body;

    if (!nome || !id || !descricao || !preco  ) return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    db.query("UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?", [nome, descricao, preco, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao atualizar produto" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "produto não encontrado!" });
        res.json({ mensagem: "Produto atualizado com sucesso!" });
    });
};

// Deletar um produto
exports.deletarProduto = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM produtos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao excluir produto" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json({ mensagem: "Produto excluído com sucesso!" });
    });
};
exports.deletarProduto = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM produtos WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao excluir produto" });
        if (resultado.affectedRows === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json({ mensagem: "Produto excluído com sucesso!" });
    });
};

