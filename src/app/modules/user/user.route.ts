import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { AccountType } from './user.interface';

const router = express.Router();

router.post(
  '/create-user',
  auth(AccountType.ADMIN),
  UserControllers.createUser,
);

export const UserRoutes = router;
