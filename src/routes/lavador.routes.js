const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const Lavador = require('../usecases/lavador.usecase')

router.get('/',async(request,response)=>{
    try {
        const allLavadores = await Lavador.getAll()
        response.json({
            ok:true,
            message: 'Here are all the lavadores',
            allLavadores
        })
    } catch (error) {
        response.status(error.status)
        response.json({
            ok:false,
            error
        })
    }
})


router.get('/:id', async (request,response) => {
    try {
        const getLavador = await Lavador.getById(request.params.id)

        if(!getLavador){
            throw new createError (404, 'Lavador not found')
        }
    
        response.json({
            ok:true,
            Lavador: getLavador
        })    
    } catch (error) {
        response.status( error.status || 500 )
        response.json({
            ok:false,
            message: error.message
        })
    }
    
})

router.delete('/:id' , async (request, response) => {
    try {
        const DeleteLavador = await Lavador.deleteById(request.params.id)

        response.json({
            ok:true,
            LavadorDeleted: DeleteLavador 
        })
    } catch (error) {
        response.status( error.status || 500 )
        response.json({
            ok:false,
            message: error.message
        })
    }
})

router.post('/', async (request,response) => {
    try {
        const NewLavador = await Lavador.create(request.body)
        response.json({
            ok: true,
            message: 'Lavador created',
            New_Lavador: NewLavador
        })
        
    } catch (error) {
        response.status( error.status || 500 )
        response.json({
            ok:false,
            message: error.message
        })
    }
})


router.patch('/:id' , async(request,response) => {
    try {
        const lavadorUpdated = await Lavador.UpdateById(request.params.id, request.body)
        response.json({
            ok: true,
            Lavador: lavadorUpdated
        })
        
    } catch (error) {
        response.status( error.status || 500 )
        response.json({
            ok:false,
            message: error.message
        })
    }
})

module.exports = router