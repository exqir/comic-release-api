import { RequestHandler } from 'express'
import * as passport from 'passport'

/**
 * Home route
 * @param _
 * @param res
 * @param next
 */
export const getHome: RequestHandler = (_, res, next) => {
  res.json({ loginStatus: true })
  next()
}

/**
 * Failure route
 * @param _
 * @param res
 * @param next
 */
export const getLogin: RequestHandler = (_, res, next) => {
  res.json({ loginStatus: false, message: 'invalid username or password' })
  next()
}

/**
 * Login route
 */
export const postLogin: RequestHandler = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
})

/**
 * Register route
 * @param req
 * @param res
 * @param next
 */
export const postRegister: RequestHandler = (req, res, next) => {
  async function action() {
    // const user = await userService.createUser(req.body.username, req.body.password)
    // res.send(user)
    res.send(false)
    next()
  }
  action().catch(next)
}
