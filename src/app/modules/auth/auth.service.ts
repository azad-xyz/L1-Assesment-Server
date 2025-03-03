/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../user/user.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { Agent } from '../agent/agent.model';
import { AccountType } from '../user/user.interface';

const loginUser = async (req: any) => {
  // const userData = req.body;
  const { email, pin } = req.body;
  let user = null;
  // Step 1: Check in User Collection
  user = await User.findOne({ email });
  // Step 2: If not found in User, check in Agent Collection
  if (!user) {
    user = await Agent.findOne({ email });
  }

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, `user not found`);
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, `user is deleted`);
  }

  const isApproved = user?.isApproved;
  if (isApproved === false) {
    throw new AppError(httpStatus.FORBIDDEN, `wait for the approval`);
  }

  const isLoggedIn = user?.isLoggedIn;
  if (isLoggedIn === true) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `you can logged in Only One Device at a Time`,
    );
  }

  // is password valid
  const isPasswordMatched = await bcrypt.compare(
    String(pin),
    String(user?.pin),
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, `wrong pass`);
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.accountType,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    String(config.jwt.jwt_access_secret),
    { expiresIn: String(config.jwt.jwt_access_expires_in) },
  );

  // Step 9: Update isLoggedIn Field
  user.isLoggedIn = true;
  await user.save();

  return {
    accessToken,
  };
};

const logOut = async (req: any) => {
  console.log('user =>', req.user);
  console.log('body =>', req.body);

  const { _id, accountType } = req.user;

  let user: any;

  if (accountType === AccountType.USER) {
    user = await User.findById(_id);
  } else if (accountType === AccountType.AGENT) {
    user = await Agent.findById(_id);
  }
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `User not found`);
  }

  user.isLoggedIn = false;
  await user.save();

  return { message: 'Logout Successful' };
};

export const AuthServices = {
  loginUser,
  logOut,
};
