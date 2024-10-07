const fs = require('fs')
const express = require("express")

const app = express()
const user = {name: '123456789_123456789_', imgSrc: "data:image/jpeg;base64," + fs.readFileSync("./public/imgs/author.jpeg", {encoding: 'base64'})}

// Template Engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static("public"))

// Routes
app.get("/", (req, res) => {
    // res.render("index", {user})
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})
app.listen(5000)