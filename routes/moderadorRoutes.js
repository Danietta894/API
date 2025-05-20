// routes/moderadorRoutes.js
const express = require("express");

const router = express.Router();
const {
  verificarToken,
  verificarPermissao,
} = require("../middleware/authMiddleware");
const { listarAtividades } = require("../controllers/moderadorController");

router.get("/moderador/perfil", verificarToken, verificarPermissao([1,4]), (req, res) => {
  res.json({
    nome: "João Moderador",
    fotoPerfil: "/perfis/moderador.jpg",
    bio: "Ajudando a manter a qualidade do conteúdo da comunidade.",
    permissoes: [
      "Validar ou recusar imagens enviadas",
      "Moderador de comentários e denúncias",
      "Atribuir categorias e tags às fotos",
      "Contribuir com curadoria de conteúdo",
    ],
    fotos: [
      { url: "/nuvens/nuvem4.jpeg" },
      { url: "/nuvens/nuvem5.jpg" },
      { url: "/nuvens/nuvem6.jpeg" },
    ],
  });
});

router.get("/moderador/atividades", verificarToken, listarAtividades);

module.exports = router;
