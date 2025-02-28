import { Request } from 'express';
import { User } from '../user/user.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const loginUser = async (req: Request) => {
  const userData = req.body;

  const isUserExist = await User.findOne({ email: userData.email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, `user not found`);
  }

  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, `user is deleted`);
  }
};

export const AuthServices = {
  loginUser,
};
