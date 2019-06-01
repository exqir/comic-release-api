import { Option, some, none } from 'fp-ts/lib/Option'
import { isNil } from 'ramda'

export const getEnvVar = (varName: string): Option<string> => {
  const envVar = process.env[varName]
  return isNil(envVar) ? none : some(process.env[varName])
}
