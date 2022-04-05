//enpoint -> caso de uso -> modelo
const createError = require('http-errors')
const Maps = require('../models/maps.model')

function getAll() {
    return Maps.find()
}

function getById(id) {
    return Maps.findById(id)
}

function create(mapsData) {
    const newMap = new Cars(mapsData)
    return newMap.save()
} 
async function create(userId,mapsData) {
    const newMap = new Maps(mapsData)
    newMap.id = userId
    return newMap.save()
}

function deleteById(id) {
    return Maps.findByIdAndDelete(id)
}

function patchByID(id, newMapsData) {
    return Maps.findByIdAndUpdate(id, newMapsData)
}


module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    patchByID,
}
