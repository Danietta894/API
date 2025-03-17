const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar se o usuário está autenticado
exports.verificarToken = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) return res.status(401).json({ error: "Acesso negado!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido!" });

        req.user = decoded; // Adiciona os dados do usuário ao request
        next();
    });
};

// Middleware para verificar permissões de usuários específicos
exports.verificarPermissao = (perfisPermitidos) => {
    return (req, res, next) => {
        if (!perfisPermitidos.includes(req.user.perfil_id)) {
            return res.status(403).json({ error: "Acesso não autorizado!" });
        }
        next();
    };
};
