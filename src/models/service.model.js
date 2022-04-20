const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  vehiculo: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: false
  },
  marca: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: false
  },
  modelo: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: false
  },
  color: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: false
  },
  placa: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: false
  },
  packageWash: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: false
  },
  place: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: false
  },
  month:{
    type: String,
    minlength: 2,
    maxlength: 15,
  },
  day: {
    type: Number,
    minlength: 2,
    maxlength: 50,
    required: false

  },
  hour: {
    type: String,
  },
  id: {
    ref: "user",
    type: mongoose.ObjectId,
    required: true,
  },
})

module.exports = mongoose.model('service', serviceSchema)