
const passport = require("passport")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID = '148237496069-r8e3e02j0bktukebblj9g5afh90ndmfh.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
)) 

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(user, done){
  done(null, user)
})