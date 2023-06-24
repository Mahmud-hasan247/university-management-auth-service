import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUniqueId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUniqueId()

  user.id = id

  // default password

  if (!user.password) {
    user.password = config.student_user_password as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error('failed to creating user!')
  }

  return createdUser
}

export default {
  createUser,
}
