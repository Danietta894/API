const express = require('express');
const connection = require('../config/db');
const router = express.Router();
router.get('/', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, rows) => {
        if (err) {
            console.error('Erro ao executar a query:', err);
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
    
}   );
router.get('/novo/:nome/:email/:senha', (req, res) => {
    const {nome, email, senha} = req.params;
    connection.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao executar a query:', err);
            res.sendStatus(500);
            return;
        }
        res.status(201).send(`Usuário inserido com ID: ${result.insertId}`);
    });
});
module.exports = router;
