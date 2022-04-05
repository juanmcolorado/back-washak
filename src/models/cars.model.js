const mongoose = require('mongoose')

const carsSchema = new mongoose.Schema({
  vehiculo: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true
  },
  marca: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true
  },
  modelo: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true
  },
  color: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true
  },
  placa: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: false
  },
  id: {
    ref: 'user',
    type: mongoose.ObjectId,
    required: true,
  },
})

module.exports = mongoose.model('cars', carsSchema)