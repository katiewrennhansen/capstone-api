const AuthService = require('../auth/auth-service')


function jwtAuth(req, res, next){
    const authToken = req.get('Authorization') || ''

    let bearerToken
    if(!authToken.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({
            error: 'cant find token'
        })
    } else {
        bearerToken = authToken.slice(7, authToken.length)
    }

    try {
        const payload = AuthService.verifyJwt(bearerToken)
        const db = req.app.get('db')
        AuthService.getUserName(db, payload.sub)
            .then(user => {
                if(!user)
                    return res.status(401).json({
                        error: 'cant find user'
                    })
                req.user = user
                next()
            })
    } catch(error) {
        return res.status(401).json({
            error: 'something else'
        })
    }
}



module.exports = jwtAuth