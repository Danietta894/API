const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("../middleware/authGoogle");
const { verificarToken } = require("../middleware/authMiddleware");

router.post("/register", authController.register);


router.post("/login", authController.login);


router.post("/logout", authController.logout);


router.post("/esquecisenha", authController.esqueciSenha);

router.get("/test", (req, res) => {
  res.json({ message: "Rota de teste funcionando!" });
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/", 
  }),
  authController.loginGoogle
);

router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    message: "Bem-vindo ao seu perfil!",
    usuario: req.user,
  });
});

module.exports = router;
