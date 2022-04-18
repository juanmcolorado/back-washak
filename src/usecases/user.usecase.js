
const createError = require('http-errors')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt.lib')

async function create(userData) {
    const userFound = await User.findOne({ email: userData.email })
    if (userFound) {
        throw new createError(412, "User already exists")
    }
    const hash = await bcrypt.hash(userData.password,5)
    userData.password = hash
    return User.create(userData)
}

function getAll(){
    return User.find()
}

function getById (id) {
    return User.findById(id)
}

function UpdateById (id, newDataUser) {
    return User.findByIdAndUpdate(id, newDataUser)
}

function deleteById (id) {
    return User.findByIdAndDelete(id)
}

async function login(email,password){
    const userFound = await User.findOne({email})
    if(!userFound){
        throw new createError(401,'Invalid user')
    }
    const isValidPassword = await bcrypt.compare(password,userFound.password)
    if(!isValidPassword){
        throw new createError(401,'Invalid user')
    }

    return {
        token : jwt.sign({ id:userFound._id }),
        user: userFound._id
    }
}


module.exports = {
    getAll,
    getById,
    UpdateById,
    create,
    deleteById,
    login
}

