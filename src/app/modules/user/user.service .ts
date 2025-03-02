/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from '../../errors/AppError';
import { User } from './user.model';
import httpStatus from 'http-status';
import config from '../../config';
import bcrypt from 'bcryptjs';

const createUserIntoDB = async (req: any) => {
  const userData = req.body;

  const existingUser = await User.findOne({ email: userData?.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, 'user already exist');
  }

  const hashedPin = await bcrypt.hash(
    String(userData.pin),
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.create({ ...userData, pin: hashedPin });
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
