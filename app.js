const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("./middleware/authGoogle");

const app = express();

//  Middlewares básicos
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); //  Apenas isso, sem session

// Teste se a API está rodando
app.get("/", (req, res) => {
  res.send(" API NuvemLens rodando!");
});

//  Rotas de autenticação
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//  Outras rotas da API
app.use("/api", require("./routes/fotoRoutes"));
app.use("/api/comentarios", require("./routes/comentarioRoutes"));
app.use("/api", require("./routes/curtidaRoutes"));
app.use("/api", require("./routes/envioRoutes"));
app.use("/api", require("./routes/perfilRoutes"));
app.use("/api", require("./routes/pedidosRoutes"));
app.use("/api/produtos", require("./routes/produtoRoutes"));
app.use("/api", require("./routes/usuarioRoutes"));
app.use("/api/pagamentos", require("./routes/pagamentoRoutes"));
app.use("/api", require("./routes/itens_pedidosRoutes"));
app.use("/api/denuncia", require("./routes/denunciaRoutes"));
app.use("/api", require("./routes/moderadorRoutes"));
app.use("/api", require("./routes/validacaoRoutes"));

//  Uploads
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", require("./routes/uploadRoutes"));

module.exports = app;
