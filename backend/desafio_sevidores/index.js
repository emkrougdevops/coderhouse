const express = require('express');
const fs = require('fs');
const app = express();

// lectura de Json con fs
const productsData = fs.readFileSync('input/products.json');
const products = JSON.parse(productsData);

// Ruta 1 solicitada para este desafio
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
});

// Ruta 2 solicitada para este desafío
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'El producto no existe' });
    }
});

// Verificion del servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
