const passport = require('passport')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  User.findById(userId)
  .then((user) => {
    done(null, user)
  })
  .catch((err) => done(err))
})



const GitHubStrategy = require('passport-github').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail){
  const autheticateUser = (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null){
      return done(null, false, {message: 'No user with that email'})
    }

    try {
      if(await bcrypt.compare(password, user.password)) {
        return done(null, user)

      } else {
        return done (null, false, {message: 'pasword incorrect'})
      }
    } catch (e) {
      return done(e)
    }
  }
  passport.use(
    new GitHubStrategy(
      {
        clientID: keys.GITHUB.clientID,
        clientSecret: keys.GITHUB.clientSecret,
        callbackURL: 'http://localhost:3000/auth/github/callback',
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
          return done(err, user)
        })
      }
    )
  )

  
  app.post('/api/login', (req, res) => {
    passport.authenticate('local', function (err, user, info) {
      console.log(user)
      res.send(user)
    })(req, res)
  })
  
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    console.log(req.user)
    res.send(req.user)
  })
  

// app/setupPassport.js
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.login_user.findOne({
      where: {
        'username': username
      }
    }).then(function (user) {
      if (user == null) {
        return done(null, false, { message: 'Incorrect credentials.' })
      }
        
      var hashedPassword = bcrypt.hashSync(password, user.salt)
        
      if (user.password === hashedPassword) {
        return done(null, user)
      }
        
      return done(null, false, { message: 'Incorrect credentials.' })
    })
  }
))



///serial lize

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
new GitHubStrategy(
  {
      clientID: 3f3cc46712d1647401a0,
  clientSecret: 969277c5eac2c49af52dba9eba2c400ea41b8e0f,
    callbackURL: 'http://localhost:3000/user/signin/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user)
    })
  }
)
)