const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./middlewares/errorHandler.middleware')
const logger = require('./middlewares/logger.middleware')
const carsRouter = require('./routes/cars.routes')
const authRoutes = require('./routes/auth.routes')
const usersRouter = require('./routes/user.routes')

app.use(express.json())
app.use(cors())
app.use(errorHandler)
app.use(logger)
app.use('/user', usersRouter)
app.use('/cars', carsRouter)
app.use('/auth', authRoutes)

app.get('/', (request,response) => {
    response.json({
        ok: true,
        message: 'Washak api is ready'
    })
})

module.exports = app