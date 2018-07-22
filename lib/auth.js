import passport from 'passport'
import { Strategy } from 'passport-local'
import session from 'express-session'

import { DependenciesFactory } from './factories/dependencyFactory'

const { userService } = DependenciesFactory.getDependencies()

export function setupPassportStrategy() {
  passport.use('local', new Strategy(
    function(username, password, done) {
      userService.verifyUser(username, password)
        .then(user => done(null, user))
        .catch(err => done(null, false))
    }
  ))
  
  passport.serializeUser(function(user, done) {
    return done(null, user._id);
  })
  
  passport.deserializeUser(function(id, done) {
    userService.getUserById(id)
      .then(user => {
        if (user) return done(null, user)
        else return done(new Error('user not found'))
      })
      .catch(err => done(err))
  })
}

export function configureExpressForPassport(app) {
  // SESSIONS
  // passport's session piggy-backs on express-session
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: '_sid',
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // ROUTES
  // SUCCESS ROUTE
  app.get('/', function(req, res, next) {
    res.json({ loginStatus: true })
    next()
  })
  // FAILURE ROUTE
  app.get('/login', function(req, res, next) {
    res.json({ loginStatus: false, message: 'invalid username or password' })
    next()
  })
  // LOGIN ROUTE
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  // REGISTER ROUTE
  app.post('/register', function(req, res, next) {
    async function action() {
      const user = await userService.createUser(req.body.username, req.body.password)
      res.send(user)
    }
    action().catch(next)
  })
}