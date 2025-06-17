const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const usuarioController = require("../controllers/usuarioController");

router.use(authMiddleware.verificarToken);

router.get("/perfilusuario", (req, res) => {
  const usuarioId = req.usuarioId;
console.log(usuarioId); 
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
router.put("/eu", usuarioController.atualizarUsuario); 
router.get("/eu", usuarioController.buscarUsuarioeu);
router.get("/:id", usuarioController.buscarUsuario);
router.post("", usuarioController.criarUsuario);
router.delete("/:id", usuarioController.deletarUsuario);
router.get("", usuarioController.listarUsuarios);

module.exports = router;
