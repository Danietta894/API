const express = require('express');
const connection = require('../config/db');
const router = express.Router();
router.get('/', (req, res) => {
    connection.query('SELECT * FROM produtos', (err, rows) => {
        if (err) {
            console.error('Erro ao executar a query:', err);
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
    
}   );
router.post('', (req, res) => {
    const { nome, preco, categoria } = req.body;
    connection.query('INSERT INTO produtos (nome, preco, categoria) VALUES (?, ?, ?)', [nome, preco, categoria], (err, result) => {
        if (err) {
            console.error('Erro ao inserir produto:', err);
            res.sendStatus(500);
            return;
        }
        res.json({ id: result.insertId, nome, preco, categoria });
    });
});
module.exports = router;