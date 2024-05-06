import express from 'express'
import { __dirname } from './utils.js'
import productsRouter from './routes/products.route.js'
import productsCarts from './routes/carts.route.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.route.js'
import { Server } from 'socket.io'
import http from 'http'
import { connect } from 'http2'
//import connectDB from './config/index.js'

//Variables globales
const app = express()
const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT,error => {
    if(error){
        console.log(error)
    }
    console.log('Server escuchando en el puerto 8080')
})

//creacionde socket server
const io = new Server(httpServer);
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    // Aquí puedes manejar eventos de Socket.IO
    
});


//Defino motor de plantillas para express
app.engine('handlebars', handlebars.engine())

//Direccion de plantillas
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

//connectDB()

// lectura de Json y archivos estaticos
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static(path.join(__dirname+'/public')))
app.use(express.static(__dirname+'/public'))

//Rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', productsCarts)
app.use('/', viewsRouter)

//Midlewere para los errores de servidor
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})
