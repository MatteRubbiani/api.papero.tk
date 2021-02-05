const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const connectDB = require("./config/db")
const cookieParser = require('cookie-parser');

//Load Config
dotenv.config({path: "./config/config.env"})

//Passport Config
require("./config/passport")(passport)
connectDB()

const app = express()

//Sessions
app.use(session({
    secret: "abcde",
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    maxAge: 365 * 24 * 60 * 60 * 1000//new Date(Date.now() + (60*60*24*365))
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Cookies Middleware
app.use(cookieParser("abcde"));

//Routes
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/user", require("./routes/user"))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server running'))