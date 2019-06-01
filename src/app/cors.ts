import { Request, Response, NextFunction, Express } from 'express'

/**
 * CORS SETUP
 */
export const setupCors = (app: Express): Express => {
  app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    )
    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  })

  return app
}
