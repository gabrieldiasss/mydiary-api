const jwt = require("jsonwebtoken")
const authSecret = require("../config/auth.json")

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization

    if(!authHeader)
    return res.status(401).json("Você não informou o token")

    const parts = authHeader.split(' ')

    if(!parts.length === 2)
    return res.atatus(401).json("Erro no token")

    const [ scheme, token ] = parts

    if(!/^Bearer$/i.test(scheme))
    return res.status(401).json("Token está mal formatado")

    jwt.verify(token, authSecret.secret, (err, decoded) => {
        if(err) return res.status(401).json("Token inválido")

        req.userId = decoded.id
        return next()
    })

}