require("dotenv").config();
console.log(process.env.GOOGLE_CLIENT_ID);
const app = require("./app");


// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Servidor rodando na porta ${PORT}`));
