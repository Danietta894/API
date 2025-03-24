const db = require("../config/db");

// Criar nova foto
exports.criarFoto = async (req, res) => {
    const { url, descricao, tipo, usuario_id } = req.body;

    if (!url || !descricao || !tipo || !usuario_id) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    try {
        const query = "INSERT INTO fotos (url, descricao, tipo, usuario_id) VALUES (?, ?, ?, ?)";
        const valores = [url, descricao, tipo, usuario_id];

        db.query(query, valores, (erro, resultado) => {
            if (erro) {
                console.error(erro);
                return res.status(500).json({ erro: "Erro ao salvar a foto" });
            }
            res.status(201).json({ id: resultado.insertId, ...req.body });
        });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao salvar a foto" });
    }
};

// Listar todas as fotos
exports.listarFotos = (req, res) => {
    const query = "SELECT * FROM fotos";

    db.query(query, (erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar fotos:", erro); // LOG DO ERRO NO SERVIDOR
            return res.status(500).json({ erro: "Erro ao buscar as fotos" });
        }
        res.json(resultados);
    });
};
// Listar todas as fotos
exports.listarFotosporid = (req, res) => {
    const query = "SELECT * FROM fotos WHERE id = ?";
    const { id } = req.params;
    db.query(query, [id], (erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar fotos:", erro); // LOG DO ERRO NO SERVIDOR
            return res.status(500).json({ erro: "Erro ao buscar as fotos" });
        }
        res.json(resultados);
    });
};


// Atualizar uma foto
exports.atualizarFoto = (req, res) => {
    const { id } = req.params;
    const { url, descricao, tipo } = req.body;

    const query = "UPDATE fotos SET url = ?, descricao = ?, tipo = ? WHERE id = ?";
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
