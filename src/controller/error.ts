import { RequestHandler, ErrorRequestHandler } from "express";

export const notFound: RequestHandler = (_, res, next) => {
  res.status(404).json({ error: 404, message: "Sorry, we don\'t know that path." })
}

export const internalError: ErrorRequestHandler = (err, _, res, next) => {
  // @TODO: do something with the error e.g. logging
  console.error(err.stack)
  res.status(500).json({ error: 500, message: "Sorry, we had some problems with your request. Please try again."})
  next()
}