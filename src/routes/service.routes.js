const express = require('express')
const createError = require('http-errors')
const service = require('../usecases/service.usecase')
const router = express.Router()
const auth = require('../middlewares/auth.middleware')
/* 
router.get('/', async (request,response) => {
    try {
        const allService = await service.getAll()
        response.json({
            ok: true,
            posts: allServices,
            message: 'All Sercices'
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
        const serviceFound = await service.getById(request.params.id)
        if (!serviceFound) {
            const error = new Error('service not found')
            error.status = 404
            throw error
        }
        response.json({
            ok: true,
            cars: serviceFound,
            message: 'Service found successfully'
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.post('/', auth, async (request, response) => {
    try {
        console.log('id',request.user)
        const serviceCreated = await service.create(request.user.id,request.body)
        response.json({
            ok: true,
            message: 'Service asigned',
            cars: serviceCreated
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
        const serviceDeleted = await service.deleteById(request.params.id)
        if (!serviceDeleted) {
            response.status(400)
            response.json({
                ok:false,
                message: 'Service not found'
            })
        }
        response.json({
            ok: true,
            message: 'Service Deleted',
            cars: serviceDeleted
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
        const newServiceData = request.body
        const serviceUpdate = await service.patchByID(id,newServiceData)
        if (!serviceUpdate) {
            response.status(404)
            response.json({
                ok: false,
                message: "Service id not found"
            })
            return
        }
        response.json({
            ok: true,
            message: 'service updated',
            cars: serviceUpdate
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok: false,
            error: error.message
        })
    }
})

router.get('/',auth, async(request, response)=>{
    try {
        const allService = await service.getByUserId(request.user.id)
        response.json({
            ok:true,
            allService
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