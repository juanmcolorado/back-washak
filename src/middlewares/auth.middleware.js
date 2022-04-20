const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

function auth(req, res, next) {
    try {
        if (req.headers) {
            const authorization = req.headers.authorization || ''
            const token = authorization.replace('Bearer ', '')
            const payload = jwt.verify(token, JWT_SECRET)
            console.log('TokenValidado:', payload)
            next()
        }
    } catch (error) {
        res.status(401)
        res.json({
            ok: false,
            error
        })
    }
}


module.exports = auth