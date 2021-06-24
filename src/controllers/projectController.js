const express = require("express")
const mongoose = require("mongoose")

const authMiddleware = require("../middlewares/authMiddleware")

require("../models/Post")
const Post = mongoose.model("posts")

const router = express.Router()

router.use(authMiddleware)

router.get("/", async(req, res) => {
    
    const get = await Post.find()

    res.json(get)

})

module.exports = router