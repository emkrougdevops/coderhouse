import express from 'express'
import { __dirname } from './utils.js'
import cartsRouter from '../routes/carts.router.js'
import productsRouter from '../routes/products.router.js'

//variables globales
const app = express()

// lectura de Json con fs
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Rutas
app.use('/api/carts',cartsRouter)
app.use('/api/products', productsRouter)


app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

//Escuchar en un puerto http
app.listen(8080, error => {
    if(error){
        console.log(error)
    }
    console.log('Servidor escuchando en puerto 8080')
})
