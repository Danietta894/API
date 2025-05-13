const express = require("express");
const router = express.Router();
const ProdutoController = require("../controllers/produtoController");

// Definição das rotas
router.post("/produto", ProdutoController.criarProduto);
router.get("/produto", ProdutoController.listarProdutos);
router.get("/produto/:id", ProdutoController.buscarProdutoPorId);
router.put("/produto/:id", ProdutoController.atualizarProduto);
router.delete("/produto/:id", ProdutoController.deletarProduto);

module.exports = router;