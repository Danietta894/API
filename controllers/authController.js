const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Login de Usuário
exports.login = (req, res) => {
    const { email, senha } = req.body;
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Erro no servidor" });
        if (result.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

        const usuario = result[0];
        
        // Comparar senha com hash armazenado
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return res.status(401).json({ error: "Senha incorreta" });

        // Criar token JWT
        const token = jwt.sign(
            { id: usuario.id, perfil_id: usuario.perfil_id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ token, perfil_id: usuario.perfil_id, nome: usuario.nome });
    });
};

// Registro de Novo Usuário
exports.register = async (req, res) => {
    const { nome, email, senha } = req.body;
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const sql = "INSERT INTO usuarios (nome, email, senha, perfil_id) VALUES (?, ?, ?, 3)";
    db.query(sql, [nome, email, senhaCriptografada], (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao criar usuário" });
        res.json({ message: "Usuário registrado com sucesso!" });
    });
};

// Logout (Simplesmente remove o token no front-end)
exports.logout = (req, res) => {
    res.json({ message: "Logout realizado com sucesso!" });
};


