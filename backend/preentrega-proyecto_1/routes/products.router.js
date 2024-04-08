import { Router } from 'express'
import fs from 'fs'

const router = Router()

//Leo datos de mi archivo de productos
const productsData = fs.readFileSync('./data/products.json',"utf8")
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

//Endpoint para actualizar productos
//agregaaar validacion de id que no se repita
router.post('/', (req, res) => {
    const { id, title, description, code, price, thumbnail, status, stock, category } = req.body
    if(!thumbnail) return res.send({status: 'error', error: 'faltan campos'})

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
})

// Endpoint para actualizar un usuario
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