const jwt = require('../lib/jwt.lib')

function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization || ''
        const token = authorization.replace('Bearer ', '')
        const payload = jwt.verify(token)
        console.log('TokenValidado:', payload)
        req.user = { id: payload.id }
        next()
    } catch (error) {
        res.status(401)
        res.json({
            ok: false,
            error
        })
    }
}


module.exports = auth