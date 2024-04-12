import { Router } from 'express'
import { __dirname } from '../utils.js'
import fs from 'fs'
import path from 'path'

const router = Router()

//Creacion de cartsManager
class cartsManager {

    constructor(){
        this.products = []
        this.nextId = 1
        this.path = path.join(__dirname+'/data/carrito.json')
        this.loadNextId() // funcion para crear ID
    }

    // Método para crear un nuevo carrito
    addCart(products) {
        let existingProduct = this.products.find(p => p.id === products.id);
        if (existingProduct) {
            throw new Error('El código del producto ya está en uso.')
        }
        // Generar un ID único para el carrito
        const cartId = this.nextId++
        //const newCart = { id, ...products};
        const newCart = {
            id: cartId,
            products: products
        }
        // Guardar el nuevo carrito en el archivo JSON
        this.saveCart(newCart)
        return newCart
    }

    saveCart(cart){
        // Leer los carritos existentes del archivo
        let carts = [];
        try {
            const data = fs.readFileSync(this.path, 'utf8')
            carts = JSON.parse(data)
        } catch (error) {
            console.error('Error al leer el archivo de carritos:', error)
        }

        // Agregar el nuevo carrito a la lista
        carts.push(cart)

        // Escribir la lista actualizada de carritos en el archivo
        try {
            fs.writeFileSync(this.path, JSON.stringify(carts, null, 4))
        } catch (error) {
            console.error('Error al escribir en el archivo de carritos:', error)
        }
    }

    loadNextId() {
        try {
            const data = fs.readFileSync(this.path, 'utf8')
            const carts = JSON.parse(data)
            if (carts.length > 0) {
                const lastCart = carts[carts.length - 1]
                this.nextId = lastCart.id + 1 // Incrementar el ID
            } else {
                this.nextId = 1 // Si no hay carritos, empezar desde 1
            }
        } catch (error) {
            console.error('Error al leer el archivo de carritos:', error)
        }
    }
}

//INICIO DE CRUD

//Defino mi clase managerCarts
const managerCarts = new cartsManager()

//Endpoint para agregado de caritos
router.post('/', (req, res) => {
    // Array fijo de un producto determinado
    const products = [
        { "id": 1, "name": "Producto 1", "price": 10 }
    ];

    // Crear el nuevo carrito
    const newCart = managerCarts.addCart(products)

    // Enviar la respuesta con el nuevo carrito
    res.status(201).json(newCart)
});

// Endpoint para obtener los productos de un carrito específico
router.get('/:cid', (req, res) => {
    const { cid } = req.params // Obtener el parámetro cid de la URL
    let cartProducts = []
    
    try {
        // Leer el archivo de carritos
        const data = fs.readFileSync(managerCarts.path, 'utf8')
        const carts = JSON.parse(data)
        
        // Buscar el carrito con el ID proporcionado
        const cart = carts.find(cart => cart.id === parseInt(cid))
        
        // Si se encuentra el carrito, obtener los productos
        if (cart) {
            cartProducts = cart.products
            res.status(200).json(cartProducts)
        } else {
            // Si no se encuentra el carrito, devolver un mensaje de error
            res.status(404).json({ message: 'Carrito no encontrado' })
        }
    } catch (error) {
        console.error('Error al leer el archivo de carritos:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
});


// Endpoint para agregar un producto al carrito seleccionado
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params
    const productId = parseInt(pid)

    try {
        // Leer el archivo de carritos
        const data = fs.readFileSync(managerCarts.path, 'utf8');
        let carts = JSON.parse(data)
        
        // Buscar el carrito con el ID 
        const cartIndex = carts.findIndex(cart => cart.id === parseInt(cid))
        
        // Si se encuentra el carrito, buscar el producto
        if (cartIndex !== -1) {
            const cart = carts[cartIndex]
            const existingProductIndex = cart.products.findIndex(product => product.id === productId);

            // Si el producto existe, incrementar la cantidad
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1
            } else {
                // Si el producto no existe, agregarlo al carrito con cantidad 1
                cart.products.push({ id: productId, quantity: 1 })
            }

            // Actualizar el archivo de carritos
            carts[cartIndex] = cart
            fs.writeFileSync(managerCarts.path, JSON.stringify(carts, null, 4))

            // Enviar la respuesta con el carrito actualizado
            res.status(200).json(cart)
        } else {
            // Si no se encuentra el carrito, devolver un mensaje de error
            res.status(404).json({ message: 'Carrito no encontrado' })
        }
    } catch (error) {
        console.error('Error al leer/escribir el archivo de carritos:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
});


export default router