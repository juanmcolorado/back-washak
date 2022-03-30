const jwt = require('../lib/jwt.lib')

function auth(request, response, next) {
    try {
        const authorization = request.headers.authorization || ''
        const token = authorization.replace('Bearer ', '')
        jwt.verify(token)
        next()
    } catch (error) {
        response.status(401)
        response.json({
            ok: false,
            error
        })
    }
}

module.exports = auth