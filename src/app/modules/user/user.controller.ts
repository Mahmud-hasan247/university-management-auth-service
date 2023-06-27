import { RequestHandler } from 'express';
import userServices from './user.services';

const userCreate: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await userServices.createUser(user);
    res.status(200).json({
      code: 200,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  userCreate,
};
