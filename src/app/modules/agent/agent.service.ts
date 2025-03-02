/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from '../../errors/AppError';
import { Agent } from './agent.model';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import config from '../../config';

const createAgentIntoDB = async (req: any) => {
  const agentData = req.body;

  const existingAgent = await Agent.findOne({ email: agentData?.email });
  if (existingAgent) {
    throw new AppError(httpStatus.CONFLICT, 'user already exist');
  }

  const hashedPin = await bcrypt.hash(
    String(agentData?.pin),
    Number(config.bcrypt_salt_rounds),
  );

  const result = Agent.create({ ...agentData, pin: hashedPin });
  return result;
};

export const AgentServices = {
  createAgentIntoDB,
};
