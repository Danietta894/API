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

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
