//enpoint -> caso de uso -> modelo
const createError = require('http-errors')
const Service = require('../models/service.model')

function getAll() {
    return Service.find()
}

function getByUserId(userId){
    return Service.find({user:userId}).populate()
  }
  
function getById(id) {
    return Service.findById(id)
}

function create(serviceData) {
    const newService = new Service(serviceData)
    return newService.save()
} 
async function create(userId,serviceData) {
    const newService = new Service(serviceData)
    newService.id = userId
    return newService.save()
}

function deleteById(id) {
    return Service.findByIdAndDelete(id)
}

function patchByID(id, newServiceData) {
    return Service.findByIdAndUpdate(id, newServiceData)
}


module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    patchByID,
    getByUserId,
}
