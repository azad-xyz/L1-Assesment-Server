import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AccountType } from './user.interface';
import { UserServices } from './user.service ';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req);

  const roleMessage =
    result.accountType === AccountType.AGENT
      ? 'Agent created successfully '
      : 'User created successfully ';

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: roleMessage,
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
