
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

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


module.exports = mongoose.model('user' , userSchema)