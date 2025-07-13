import express from 'express';
import authMiddleware from '../../libs/middlewares/auth.middleware';
import { UserController } from './user.controller';

const router = express.Router();

const userController = new UserController();

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get(
  '/authenticated-user',
  authMiddleware,
  userController.getAuthenticatedUser,
);

export default router;
