const passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID:     3f3cc46712d1647401a0,
    clientSecret: a5445c8652300719fd1cbc4e4b9b9e127a38e645,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  } 