//Mongoose y express
const express = require('express')
const mongoose = require('mongoose')
//controladores
const {
    saveUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require('./controllers/user.controller.js')

//Instanciar express
const server = express()

//middlewares
server.use(express.json())

//Conexión con mongo compass
mongoose.connect('mongodb://localhost:27017/users')
.then(()=> console.log('Conectado a la base de datos'))

//Levantar nuestro servidor
server.listen(3030, ()=>{
    return console.log('Servidor Corriendo')
})

//ruta (endpoint) para crear usuario
server.post('/users', saveUser)

//ruta (endpoint) para obtener todos los usuarios
server.get('/users', getAllUsers)

//ruta (endpoint) para actualizar un usuario
server.put('/users/:id', updateUser)

//ruta (endopint) para eliminar un usuario
server.delete('/users/:id', deleteUser)