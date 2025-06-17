const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  verificarToken,
  verificarPermissao,
} = require("../middleware/authMiddleware");
const passport = require("../middleware/authGoogle");

//  Rota para login com Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔙 Callback após autenticação
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  authController.loginGoogle
);

//  Rota protegida
router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    message: "Bem-vindo ao seu perfil!",
    usuario: req.user,
  });
});

// 🔑 Rotas de Autenticação tradicional
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.post("/esquecisenha", authController.esqueciSenha);

module.exports = router;
