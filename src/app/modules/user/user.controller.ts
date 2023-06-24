import { Request, Response } from 'express'
import userServices from './user.services'

const userCreate = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userServices.createUser(user)
    res.status(200).json({
      code: 200,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: 'Failed to create user',
      error,
    })
  }
}

export default {
  userCreate,
}
