import express from 'express';
import authMiddleware from '../../libs/middlewares/auth.middleware';
import { UserController } from './user.controller';

const router = express.Router();

const userController = new UserController();

router.get('/toggle-privacy', authMiddleware, userController.togglePrivacy);

export default router;
