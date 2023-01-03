const express = require("express")
const passport = require("passport")
const session = require("express-session")
const app = express()
app.use(session({secret: 'auth',
                saveUninitialized: true,
                resave: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT

const googleRoutes = require("./routes/google_routes")
app.use("/google", googleRoutes)

const githubRoutes = require("./routes/github_routes")
app.use("/github", githubRoutes)

const facebookRoutes = require("./routes/facebook_routes")
app.use("/facebook", facebookRoutes)


app.listen(PORT, (err) => {
    if(err){
        console.log("server no runned")
    }else{
        console.log(`server runned on http://localhost:${PORT}`)
    }
})