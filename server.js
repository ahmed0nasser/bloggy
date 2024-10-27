const fs = require('fs')
const path = require('path')
const express = require("express")
const morgan = require('morgan')

const app = express()
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
// const user = {name: '123456789_123456789_123456789', imgSrc: "data:image/jpeg;base64," + fs.readFileSync("./public/imgs/author.jpeg", {encoding: 'base64'})}
const blogEntry = {id:1,title:"Blog Title", date:"Publishing date", description:"blog description you wanna write"}
const blogEntries = []
for (let i = 0; i < 5; i++) {
    blogEntries.push(blogEntry)
}

// Logged-in user
let user = null

// Template Engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(morgan('tiny', { stream: accessLogStream }))

// Routes
app.get("/", (req, res) => {
    res.render("index", {user})
})

app.get("/blogs", (req, res) => {
    res.render("blogs", {user, blogEntries})
})

app.get("/blogs/1", (req, res) => {
    res.render("blog", {user})
})

app.get("/edit", (req, res) => {
    res.render("blogEdit", {user})
})

app.route("/login")
.get((req, res) => {
    res.render("login")
})
.post((req, res) => {
    user = {name: req.body.username, imgSrc:""}
    res.redirect("/")    
})

app.route("/signup")
.get((req, res) => {
    res.render("signup")
})
.post((req, res) => {
    // TODO: make new entry in database
    // TODO: return user
    user = {name: req.body.username, imgSrc:""}
    res.redirect("/")
})

app.listen(process.env.PORT)