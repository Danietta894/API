const express = require("express");
const router = express.Router();
const itens_pedidosController = require("../controllers/itens_pedidosController");

router.get("/itens_pedidos", itens_pedidosController.listaritens_pedidos);
router.post("/itens_pedidos", itens_pedidosController.criarIntens_pedidos);
router.delete("/itens_pedidos/:id", itens_pedidosController.deletaritens_pedidos);
router.put("/itens_pedidos/:id", itens_pedidosController.atualizarItens_pedidos);   
module.exports = router;