//enpoint -> caso de uso -> modelo
const createError = require('http-errors')

const Cars = require('../models/cars.model')

function getAll() {
    return Cars.find()
}

function getById(id) {
    return Cars.findById(id)
}

function create(carsData) {
    const newCar = new Cars(carsData)
    return newCar.save()
}

function deleteById(id) {
    return Cars.findByIdAndDelete(id)
}

function patchByID(id, newCarsData) {
    return Cars.findByIdAndUpdate(id, newCarsData)
}


module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    patchByID,
}
