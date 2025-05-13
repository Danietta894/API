const express = require("express");
const router = express.Router();
const PagamentoController = require("../controllers/pagamentoController");

// Definição das rotas
router.post("/pagamento", PagamentoController.criarPagamento);
router.get("/pagamento", PagamentoController.listarPagamentos);
router.get("/pagamento/:id", PagamentoController.buscarPagamentoPorId);
router.put("/pagamento/:id", PagamentoController.atualizarPagamento);
router.delete("/pagamento/:id", PagamentoController.deletarPagamento);

module.exports = router;