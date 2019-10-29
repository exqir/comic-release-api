import { Logger } from "../types/app";

export const logError = (logger: Logger) => (err: Error): Error => {
  logger.error(err.message)
  return err
}