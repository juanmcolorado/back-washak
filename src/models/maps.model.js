const mongoose = require('mongoose')

const mapsSchema = new mongoose.Schema({
  ubicacion: {
    type: String,
    minlength: 2,
    maxlength: 70,
    required: true
  },
  referencias: {
    type: String,
    minlength: 2,
    maxlength: 70,
    required: true
  },
  id: {
    ref: "user",
    type: mongoose.ObjectId,
    required: true,
  },
})

module.exports = mongoose.model('maps', mapsSchema)