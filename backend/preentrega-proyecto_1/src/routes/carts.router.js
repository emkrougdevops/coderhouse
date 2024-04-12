import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { __dirname } from '../utils.js'

const router = Router()

// Crear un nuevo carrito
let carts = [];

//DEFINICION DE LOS METODOS DE CRUD

// Endpoint para crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = {
        id: generateUniqueId(), // Generar un ID único
        products: []
    };
    carts.push(newCart);
    res.json(newCart);
});

// Endpoint para listar productos en un carrito específico
router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = carts.find(cart => cart.id === cartId);
    if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart.products);
});

// Endpoint para agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    //Hay uque envíar la la cantidad el el body de la consulta http, lo probé y funciona
    const quantity = parseInt(req.body.quantity);


    const cart = carts.find(cart => cart.id === cartId);
    if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const existingProductIndex = cart.products.findIndex(item => item.product === productId);
    if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, incrementar la cantidad
        cart.products[existingProductIndex].quantity += quantity;
    } else {
        // Si el producto no existe en el carrito, agregarlo
        cart.products.push({ product: productId, quantity: quantity });
    }

    //res.json(cart.products);

    // Convertir los datos del carrito a JSON
    const cartJSON = JSON.stringify(cart.products)

    // Escribir el JSON en el archivo
    const filePath = path.join(__dirname+'/data/carts.products.json');
    fs.writeFile(filePath, cartJSON, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        console.log('Datos del carrito guardados en el archivo.');
        res.json(cart.products);
    });
});

// Función para generar un ID único para el carrito
function generateUniqueId() {
    let newId = 1;
    let idExists = true;

    while (idExists) {
        idExists = carts.some(cart => cart.id === newId.toString());
        if (idExists) {
            newId++;
        }
    }

    return newId.toString();
}

export default router