const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configurações básicas
app.use(express.json());
app.use(cors());

// Importação das rotas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const fotoRoutes = require("./routes/fotoRoutes");
app.use("/api", fotoRoutes);
const comentarioRoutes = require("./routes/comentarioRoutes");
app.use("/api", comentarioRoutes);
const curtidaRoutes = require("./routes/curtidaRoutes");
app.use("/api", curtidaRoutes);
const envioRoutes = require("./routes/envioRoutes");
app.use("/api", envioRoutes);
const perfilRoutes = require("./routes/perfilRoutes");
app.use("/api", perfilRoutes);
const pedidosRoutes = require("./routes/pedidosRoutes");
app.use("/api", pedidosRoutes);







// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
