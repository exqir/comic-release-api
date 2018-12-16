import { Express } from 'express'
import * as passport from 'passport'
// import { Strategy } from 'passport-local'
import * as session from 'express-session'
import { ApplicationConfig, DependencyInjector } from '../types/app';

// import { UserType } from '../types/mongo'

/**
 * AUTHENTICATION SETUP
 * @TODO: remove devMode fallback and instead throw a meaningful error that can be handled
 */

export const setupAuthentication = (config: ApplicationConfig, dependencies: DependencyInjector) => (app: Express): Express => {

  app.use(session({
    secret: process.env.SESSION_SECRET || 'devMode',
    resave: false,
    saveUninitialized: false,
    name: '_sid',
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // passport.use('local', new Strategy(
  //   function(username, password, done) {
  //     userService.verifyUser(username, password)
  //       .then(user => done(null, user))
  //       .catch(err => done(null, false))
  //   }
  // ))

  // passport.serializeUser(function(user: UserType, done) {
  //   return done(null, user.id);
  // })

  // passport.deserializeUser(function(id, done) {
  //   userService.getUserById(id)
  //     .then(user => {
  //       if (user) return done(null, user)
  //       else return done(new Error('user not found'))
  //     })
  //     .catch(err => done(err))
  // })

  return app
}