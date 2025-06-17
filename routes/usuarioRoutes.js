const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const usuarioController = require("../controllers/usuarioController");

router.use(authMiddleware.verificarToken);
// ✅ Adicione aqui sua nova rota simulada (ou a real depois)
router.get("/perfilusuario", (req, res) => {
  const usuarioId = req.usuarioId;
console.log(usuarioId); // Verifica se o ID do usuário está correto
  res.json({
    usuario: {
      nome: "Daniella Nunes",
      email: "daniella.etarionsn@gmail.com",
      bio: "Curiosa, apaixonada por meteorologia, amante da natureza e sempre olhando o céu!",
      interesses: "Observação de nuvens, Meteorologia, Natureza",
      projetos: "Análise de Padrões de Tempestades",
      localizacao: "Cotia, São Paulo",
    },
    fotos: [
      { url: "/nuvens/nuvem4.jpeg" },
      { url: "/nuvens/nuvem5.jpg" },
      { url: "/nuvens/nuvem6.jpeg" },
    ],
  });
});

// Outras rotas
router.put("/usuarios/eu", usuarioController.atualizarUsuario); 
router.get("/usuarios/eu", usuarioController.buscarUsuarioeu);
router.get("/usuarios/:id", usuarioController.buscarUsuario);
router.post("/usuarios", usuarioController.criarUsuario);
router.delete("/usuarios/:id", usuarioController.deletarUsuario);
router.get("/usuarios", usuarioController.listarUsuarios);

module.exports = router;
