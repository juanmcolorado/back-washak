const express = require('express')
const createError = require('http-errors')
const cars = require('../usecases/cars.usecase')
const router = express.Router()
const auth = require('../middlewares/auth.middleware')
/* 
router.get('/', async (request,response) => {
    try {
        const allCars = await cars.getAll()
        response.json({
            ok: true,
            posts: allCars,
            message: 'All Cars'
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message
        })
    }
})
 */



router.get('/:id',  async (request, response) => {
    try {
        const carsFound = await cars.getById(request.params.id)
        if (!carsFound) {
            const error = new Error('cars not found')
            error.status = 404
            throw error
        }
        response.json({
            ok: true,
            cars: carsFound,
            message: 'Car found successfully'
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.post('/:userId', auth, async (request, response) => {
    try {
        console.log('id',request.user)
        const carsCreated = await cars.create(request.params.userId,request.body)
        response.json({
            ok: true,
            message: 'Car asigned',
            cars: carsCreated
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.delete('/:id', auth, async (request, response) => {
    try {
        const carsDeleted = await cars.deleteById(request.params.id)
        if (!carsDeleted) {
            response.status(400)
            response.json({
                ok:false,
                message: 'car not found'
            })
        }
        response.json({
            ok: true,
            message: 'Car Deleted',
            cars: carsDeleted
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.patch('/:id', auth, async (request, response) => {
    try {
        const id = request.params.id
        const newCarsData = request.body
        const carsUpdate = await cars.patchByID(id,newCarsData)
        if (!carsUpdate) {
            response.status(404)
            response.json({
                ok: false,
                message: "car id not found"
            })
            return
        }
        response.json({
            ok: true,
            message: 'car updated',
            cars: carsUpdate
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok: false,
            error: error.message
        })
    }
})

router.get('/cars/:userId',/*auth,*/ async(request, response)=>{
    try {
        const allCars = await cars.getByUserId(request.params.userId)
        response.json({
            ok:true,
            allCars
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok:false,
            message: error.message
        })
    }
})


module.exports = router