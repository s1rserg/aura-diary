import { Router } from 'express';
import {
  signUp,
  signIn,
  getAuthenticatedUser,
  togglePrivacy,
} from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/authenticated-user', authMiddleware, getAuthenticatedUser);
router.get('/toggle-privacy', authMiddleware, togglePrivacy);

export default router;
