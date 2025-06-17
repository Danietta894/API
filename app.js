require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("./passport");
const session = require("express-session");
const sequelize = require("./config/database");

const app = express();

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao banco de dados."))
  .catch((err) => console.error("Erro ao conectar ao banco:", err));

app.use(cors());
app.use(express.json());


//   session({
//     secret: process.env.JWT_SECRET || "secreto",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false },
//   })
// );


// app.use(passport.session());

 app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const fotoRoutes = require("./routes/fotoRoutes");
const validacaoRoutes = require("./routes/validacaoRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");
const curtidaRoutes = require("./routes/curtidaRoutes");
const denunciaRoutes = require("./routes/denunciaRoutes");
const atividadeRoutes = require("./routes/atividadeRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/fotos", fotoRoutes);
app.use("/api/validacao", validacaoRoutes);
app.use("/api/imagens", validacaoRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/4", curtidaRoutes);
app.use("/api/5", denunciaRoutes);
app.use("/api/atividades", atividadeRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno no servidor." });
});

module.exports = app;
