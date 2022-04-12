
const createError = require('http-errors')
const Lavador = require('../models/lavador.model')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt.lib')

async function create(lavadorData) {
    const lavadorFound = await Lavador.findOne({ email: lavadorData.email })
    if (lavadorFound) {
        throw new createError(412, "Lavador already exists")
    }
    const hash = await bcrypt.hash(lavadorData.password,5)
    lavadorData.password = hash
    return Lavador.create(lavadorData)
}

function getAll(){
    return Lavador.find()
}

function getById (id) {
    return Lavador.findById(id)
}

function UpdateById (id, newDataLavador) {
    return Lavador.findByIdAndUpdate(id, newDataLavador)
}

function deleteById (id) {
    return Lavador.findByIdAndDelete(id)
}

async function login(email,password){
    const lavadorFound = await Lavador.findOne({email})
    if(!lavadorFound){
        throw new createError(401,'Invalid lavador')
    }
    const isValidPassword = await bcrypt.compare(password,lavadorFound.password)
    if(!isValidPassword){
        throw new createError(401,'Invalid lavador')
    }

    return jwt.sign({id:lavadorFound._id})
}


module.exports = {
    getAll,
    getById,
    UpdateById,
    create,
    deleteById,
    login
}

