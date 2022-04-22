const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  vehiculo: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  marca: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  modelo: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  color: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  placa: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  packageWash: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  place: {
    type: String,
    minlength: 2,
    maxlength: 50,
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
  },
  address: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  hour: {
    type: String,
  },
  status:{
    type: String,
  },
  id: {
    ref: "user",
    type: mongoose.ObjectId,
    required: true,
  },
})

module.exports = mongoose.model('service', serviceSchema)