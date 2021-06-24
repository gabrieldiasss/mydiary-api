require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

const Project = require("./controllers/projectController")
const Post = require("./controllers/postController")
const User = require("./controllers/authController")

mongoose.connect("mongodb://localhost/mydiary", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB foi conectado")
})

app.use(express.json())
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/user", User)
app.use("/project", Project)
app.use("/post", Post)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server running!!!")
})