
const mongoose = require('mongoose')

const lavadorSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require:true,
        match: /^.*@.*\..*$/,
        minlenght: 1
    },
    password:{
        type: String,
        require: true,
        minlenght: 2
    }
})


module.exports = mongoose.model('lavador' , lavadorSchema)