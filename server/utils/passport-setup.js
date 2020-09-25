const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    //options for the github strat
})() => {
  // passport callback function
})
passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(user, done){
  done(null, user)
})


passport.use(new GitHubStrategy({
    clientID:     3f3cc46712d1647401a0,
    clientSecret: a5445c8652300719fd1cbc4e4b9b9e127a38e645,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, user);
    });
  } 