import { PullListMutation } from './pulllist'
import { UserMutation } from './user'

export const RootMutation = {
  ...PullListMutation,
  ...UserMutation,
}
