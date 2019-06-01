import { RequestHandler } from 'express'

export const getStatus: RequestHandler = (_, res, next) => {
  res.json({ status: 'OK' })
  next()
}
