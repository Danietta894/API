const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .json({ error: "Acesso negado! Token não fornecido." });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido!" });

    req.user = decoded;
    next();
  });
};

// Middleware para verificar permissões de usuários específicos
exports.verificarPermissao = (perfisPermitidos) => {
  return (req, res, next) => {
    console.log(`Perfil Id:`);
    console.log(req.user.perfil_id);

    if (!perfisPermitidos.includes(req.user.perfil_id)) {
      return res.status(403).json({ error: "Acesso não autorizado!" });
    }
    next();
  };
};
