const express = require("express")
const mongoose = require("mongoose")

require("../models/Post")
const Post = mongoose.model("posts")

const router = express.Router()

const validation = require('../middlewares/validationMiddleware')
const postSchema = require("../Validation/postSchema")

router.post("/createPost", validation(postSchema), async(req, res) => {

    const post = await Post.create(req.body)

    res.json({post})
    
})

router.put("/putPost/:id", async(req, res) => {

    const { title, content } = req.body

    try {

        const put = await Post.findByIdAndUpdate({ _id: req.params.id }, {
            title,
            content
        }, {new: true})

        res.json(put)

    } catch(err) {
        res.status(400).json({ error: "error put post"})
    }

})

router.delete("/deletePost/:id", async(req, res) => {

    try {
        const deletePost = await Post.findByIdAndDelete({ _id: req.params.id })

        res.json(deletePost)

    } catch(err) {
        res.status(400).json({ error: "error delete post" + err })
    }

})

module.exports = router