import express from 'express';
import { UserController } from './user.controller';
import authMiddleware from '../../libs/middlewares/auth.middleware';

const router = express.Router();

const userController = new UserController();

router.get('/toggle-privacy', authMiddleware, userController.togglePrivacy);

export default router;
