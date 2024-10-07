const fs = require('fs')
const express = require("express")

const app = express()
const user = {name: '123456789_123456789_', imgSrc: "data:image/jpeg;base64," + fs.readFileSync("./public/imgs/author.jpeg", {encoding: 'base64'})}
const blogEntry = {id:1,title:"Blog Title", date:"Publishing date", description:"blog description you wanna write"}
const blogEntries = []
for (let i = 0; i < 5; i++) {
    blogEntries.push(blogEntry)
}

// Template Engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static("public"))

// Routes
app.get("/", (req, res) => {
    // res.render("index", {user})
    res.render("index")
})

app.get("/blogs", (req, res) => {
    res.render("blogs", {user, blogEntries})
    // res.render("blogs")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.listen(5000)