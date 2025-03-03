import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login successfull',
    data: result,
  });
});

const logOut = catchAsync(async (req, res) => {
  const result = await AuthServices.logOut(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'logged out successfull',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  logOut,
};
