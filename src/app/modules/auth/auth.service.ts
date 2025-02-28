import { Request } from 'express';
import { User } from '../user/user.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

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

  // is password valid
  const isPasswordMatched = await bcrypt.compare(
    String(userData?.pin),
    String(isUserExist?.pin),
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, `wrong pass`);
  }

  const jwtPayload = {
    userId: isUserExist?._id,
    role: isUserExist?.accountType,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    String(config.jwt.jwt_access_secret),
    { expiresIn: String(config.jwt.jwt_access_expires_in) },
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
