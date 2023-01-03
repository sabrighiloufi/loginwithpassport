const express = require("express")
const router = express.Router()
const passport = require("passport")
require("../passport_strategies/authGoogle")

function isLoggedIn(req, res, next) {
    req.user ? next () : res.sendStatus(401)
}


router.get("/", (req, res) => {
    res.send(`<html lang="en">
    <head>
    <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </head> 
    <body>
        <div class="container mt-5">
            <div class="col-md-12 text-center ">
                <a class="btn btn-primary" href="/google/auth"> authenticate with google</a>
            </div>
        </div>
    </body>
    </html>`)
   
})

router.get("/auth",
    passport.authenticate("google", {scope: ["email", "profile"]})
)

router.get("/callback",
    passport.authenticate("google", {
        successRedirect: "/google/protected",
        failureRedirect: "/google/auth/failure"
    })
)

router.get("/auth/failure", (req, res) => {
    res.send("something is wrong...")
})


router.get("/protected", isLoggedIn, (req, res) => {
    res.json(req.user)
    console.log(req.user)
})

router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.send("you are logged out")
      })
})


module.exports = router