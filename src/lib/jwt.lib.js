const jwt = require('jsonwebtoken')
require('dotenv').config()
const {JWT_SECRET} = process.env


function sign(payload ={}){
    return jwt.sign(payload,JWT_SECRET,{expiresIn:'1h'})
}

function verify(token){
    return jwt.verify(token,JWT_SECRET)
}

module.exports = {
    sign,
    verify
}