import passport from 'passport'
import { Strategy } from 'passport-local'
import session from 'express-session'

import { createNewUser } from './adapter/user'
import { verifyUser, getUserById } from './adapter/user'

export function setupPassportStrategy() {
  passport.use('local', new Strategy(
    async function(username, password, done) {
      try {
        const user = await verifyUser(username, password)
        return done(null, user)
      } catch(e) {
        console.log(e.message)
        return done(null, false)
      }
    }
  ))
  
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  })
  
  passport.deserializeUser(async function(id, done) {
    const user = await getUserById(id)
    if (user) return done(null, user)
    else return done(new Error('user not found'))
  })
}

export function configureExpressForPassport(app) {
  // SESSIONS
  // passport's session piggy-backs on express-session
  app.use(session({
    secret: 'Z3]GJW!?9uP”/Kpe'
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
      const user = await createNewUser(req.body.username, req.body.password)
      res.send(user)
    }
    action().catch(next)
  })
}