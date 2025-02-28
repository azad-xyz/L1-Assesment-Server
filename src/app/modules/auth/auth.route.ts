import express from 'express';
import { AuthControllers } from './auth.controler';

const router = express.Router();

router.post('/login', AuthControllers.loginUser);

export const AuthRoutes = router;
