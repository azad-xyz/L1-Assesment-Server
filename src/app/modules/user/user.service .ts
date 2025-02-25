/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from '../../errors/AppError';
import { User } from './user.model';
import httpStatus from 'http-status';
import config from '../../config';
import bcrypt from 'bcryptjs';
import { AccountType } from './user.interface';

const createUserIntoDB = async (req: any) => {
  const userData = req.body;

  const existingUser = await User.findOne({ email: userData?.email });
  if (existingUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'user already exist');
  }

  const hashedPin = await bcrypt.hash(
    userData.pin,
    // pinToString,
    Number(config.bcrypt_salt_rounds),
  );

  const balance = userData.accountType === AccountType.AGENT ? 10000 : 40;
  // Create the user or agent
  const newUser = new User({
    ...userData,
    pin: hashedPin,
    balance,
  });

  await newUser.save();
  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};
