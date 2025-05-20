const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configurações básicas
app.use(express.json());
app.use(cors());

// Importação das rotas
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const fotoRoutes = require("./routes/fotoRoutes");
app.use("/api", fotoRoutes);
const comentarioRoutes = require("./routes/comentarioRoutes");
app.use("/api/comentarios", comentarioRoutes);
const curtidaRoutes = require("./routes/curtidaRoutes");
app.use("/api", curtidaRoutes);
const envioRoutes = require("./routes/envioRoutes");
app.use("/api", envioRoutes);
const perfilRoutes = require("./routes/perfilRoutes");
app.use("/api", perfilRoutes);
const pedidosRoutes = require("./routes/pedidosRoutes");
app.use("/api", pedidosRoutes);
const produtoRoutes = require("./routes/produtoRoutes");
app.use("/api/produtos", produtoRoutes);
const usuarioRoutes = require("./routes/usuarioRoutes");
app.use("/api", usuarioRoutes);
const pagamentoRoutes = require("./routes/pagamentoRoutes");
app.use("/api/pagamentos", pagamentoRoutes);
const itens_pedidosRoutes = require("./routes/itens_pedidosRoutes");
app.use("/api", itens_pedidosRoutes);
const denunciaRoutes = require("./routes/denunciaRoutes");
app.use("/api/denuncia", denunciaRoutes);
const moderadorRoutes = require("./routes/moderadorRoutes");
app.use("/api", moderadorRoutes);
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", uploadRoutes);
const validacaoRoutes = require("./routes/validacaoRoutes");
app.use("/api", validacaoRoutes);



// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
