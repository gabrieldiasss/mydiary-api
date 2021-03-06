const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }

})

UserSchema.pre('save', async function(next) {

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()

})

mongoose.model("users", UserSchema)
