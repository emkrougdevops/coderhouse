import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { __dirname } from '../utils.js'

const router = Router()

//Leo datos de mi archivo de productos
const productsData = fs.readFileSync(__dirname+'/data/products.json',"utf8")
const products = JSON.parse(productsData);


//DEFINO METODOS DE CRUD

// Endpoint raíz GET /api/products
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
})

// Endpoint para filtrar producto especifico GET /api/products/:id
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'El producto no existe' });
    }
});

//Endpoint para agregar
router.post('/', (req, res) => {
    const { id, title, description, code, price, thumbnail, status, stock, category } = req.body
    if(!thumbnail) return res.send({status: 'error', error: 'faltan campos'})

    // Verificar si el ID ya existe en la lista de productos
    const existingProduct = products.find(product => product.id === id)
    if (existingProduct) {
        return res.status(400).send({ status: 'error', error: 'El ID ya existe' })
    }

    const newProduct = {
        id: id +1,
        title,
        description,
        code,
        price,
        thumbnail,
        status,
        stock,
        category
    }
    products.push(newProduct)
    res.status(200).send({ status: 'success', payload: newProduct })

    // Convertir los datos del carrito a JSON
    const productsJSON = JSON.stringify(products)

    // Escribir el JSON en el archivo
    const filePath = path.join(__dirname+'/data/products.json');
    fs.writeFile(filePath, productsJSON, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        console.log('Datos del carrito guardados en el archivo.');
        res.json(products);
    });
})

// Endpoint para actualizar productos
router.put('/:id', (req, res) => {
    const { id } = req.params
    const productsToUpdate = req.body

    const productsIndex = products.findIndex(p => p.id === parseInt(id))
    if( productsIndex === -1 ) return res.status(404).send({status: 'error', error: 'user not foun'})

    users[productsIndex] = { id: parseInt(id),  ...productsToUpdate }

    res.send({status: 'success', payload: productsToUpdate})
})

// endpoint para eliminar un producto
router.delete('/:id', (req, res) => {
    const { id } = req.params

    const productsResutl = products.filter(p => p.id !== parseInt(id))

    res.send({status: 'success', payload: productsResutl})
})

export default router