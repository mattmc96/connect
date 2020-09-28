const GitHubStrategy = require('passport-github').Strategy
const bcrypt = require('bcryptjs')


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });


passport.use(
  new GitHubStrategy(
    {
        clientID: 3f3cc46712d1647401a0,
    clientSecret: a5445c8652300719fd1cbc4e4b9b9e127a38e645,
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(err, user)
      })
    }
  )
)
