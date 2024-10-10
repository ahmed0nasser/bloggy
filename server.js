const fs = require('fs')
const express = require("express")
const validationController = require("./controllers/validationController")

const app = express()
// const user = {name: '123456789_123456789_', imgSrc: "data:image/jpeg;base64," + fs.readFileSync("./public/imgs/author.jpeg", {encoding: 'base64'})}
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

// Routes
app.get("/", (req, res) => {
    res.render("index", {user})
})

app.get("/blogs", (req, res) => {
    res.render("blogs", {user, blogEntries})
})

app.route("/login")
.get((req, res) => {
    res.render("login")
})
.post((req, res) => {
    // #TODO: Validate sent user data in req.data
    // #TODO: Fetch user's imgSrc
    // #TODO: Construct user object and assign it to variable user
    user = {name: req.body.username, imgSrc:""}
    res.redirect("/")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.listen(5000)