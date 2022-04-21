const express = require('express')
const createError = require('http-errors')
const maps = require('../usecases/maps.usecase')
const router = express.Router()
const auth = require('../middlewares/auth.middleware')

router.get('/', async (request,response) => {
    try {
        const allMaps = await maps.getAll()
        response.json({
            ok: true,
            posts: allMaps
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message
        })
    }
})


router.get('/:id',  async (request, response) => {
    try {
        const mapsFound = await maps.getById(request.params.id)
        if (!mapsFound) {
            const error = new Error('maps not found')
            error.status = 404
            throw error
        }
        response.json({
            ok: true,
            cars: mapsFound
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
        console.log('id',request.params.userId)
        const mapsCreated = await maps.create(request.params.userId,request.body)
        response.json({
            ok: true,
            message: 'Map asigned',
            cars: mapsCreated
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
        const mapsDeleted = await maps.deleteById(request.params.id)
        if (!mapsDeleted) {
            response.status(400)
            response.json({
                ok:false,
                message: 'maps not found'
            })
        }
        response.json({
            ok: true,
            message: 'Map deleted',
            cars: mapsDeleted
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
        const newMapsData = request.body
        const mapsUpdate = await maps.patchByID(id,newMapsData)
        if (!mapsUpdate) {
            response.status(404)
            response.json({
                ok: false,
                message: "map id not found"
            })
            return
        }
        response.json({
            ok: true,
            message: 'Map updated',
            cars: mapsUpdate
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok: false,
            error: error.message
        })
    }
})

module.exports = router