const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authSecret = require("../config/auth.json")

const router = express.Router()

require("../models/User")
const User = mongoose.model("users")

const validation = require('../middlewares/validationMiddleware')
const registerSchema = require("../Validation/registerSchema")
const loginSchema = require("../Validation/loginSchema")

function generateToken(params = {}) {
    return jwt.sign(params, authSecret.secret, {
        expiresIn: 86400
    })
}

router.post("/register", validation(registerSchema), async(req, res) => {

    const { username, email} = req.body

    const findAccount = await User.findOne({ username, email })

    if(findAccount)
    return res.status(400).json({ error: "Essa conta já existe!" })

    const findUser = await User.findOne({ username })

    if(findUser) 
    return res.status(400).json({ error: "Esse nome de usuário já está em uso." })

    const findEmail = await User.findOne({ email })

    if(findEmail)
    return res.status(400).json({ error: "Esse email já está em uso." })
    
    const registerUser = await User.create(req.body)

    registerUser.password = undefined

    res.json({
        registerUser,
        token: generateToken({ id: registerUser.id })
    })

})

router.post("/auth", validation(loginSchema), async(req, res) => {

    try {

        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password")

        if(!user)
        res.status(400).json({ error: "Email inválido" })

        if(!await bcrypt.compare(password, user.password))
        res.status(400).json({ error: "Senha inválida" })

        user.password = undefined

        res.json({ 
            user,
            token: generateToken({ id: user.id })
         })

    } catch(err) {
        res.status(400).json({ error: "Err auth" })
    }

})

module.exports = router

