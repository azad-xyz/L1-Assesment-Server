import express from 'express';
import { AuthControllers } from './auth.controler';
import { AgentControllers } from '../agent/agent.controller';
import { UserControllers } from '../user/user.controller';
import { AccountType } from '../user/user.interface';

const router = express.Router();

router.post('/login', AuthControllers.loginUser);

router.post('/register', (req, res, next) => {
  if (req.body.accountType === AccountType.AGENT) {
    return AgentControllers.createAgent(req, res, next);
  }
  return UserControllers.createUser(req, res, next);
});

export const AuthRoutes = router;
