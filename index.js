// Levantar la app
require('dotenv').config()
const mongoose = require('mongoose')
const server = require('./src/server')

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)


.then(() =>{
    console.log('Data Base Washak conected')
    
    server.listen(4000, ()=>{
        console.log('Washak api backend is ready on http//localhost:4000')
    })
})
.catch( error =>{
    console.error('db connection error: ', error)
})
