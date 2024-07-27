import { Router } from 'express';
import {
  signUp,
  signIn,
  getAuthenticatedUser,
} from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/authenticated-user', authMiddleware, getAuthenticatedUser);

export default router;
