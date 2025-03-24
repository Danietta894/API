const express = require("express");
const router = express.Router();
const PedidoController = require("../controllers/pedidoController");

// Definição das rotas
router.post("/pedidos", PedidoController.criarPedido);
router.get("/pedidos", PedidoController.listarPedidos);
router.get("/pedidos/:id", PedidoController.buscarPedidoPorId);
router.put("/pedidos/:id", PedidoController.atualizarPedido);
router.delete("/pedidos/:id", PedidoController.deletarPedido);

module.exports = router;
