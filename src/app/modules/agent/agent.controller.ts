import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AgentServices } from './agent.service';
import httpStatus from 'http-status';

const createAgent = catchAsync(async (req, res) => {
  const result = await AgentServices.createAgentIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Agent registered successfully!',
    data: result,
  });
});

export const AgentControllers = {
  createAgent,
};
