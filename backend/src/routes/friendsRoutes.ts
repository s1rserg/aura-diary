import { Router } from 'express';
import { sendFriendRequest, getFriendRequests, approveFriendRequest, denyFriendRequest, getFriends, getUsersByName } from '../controllers/friendsController';
import { authMiddleware as authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/requests', authenticate, sendFriendRequest);
router.get('/requests', authenticate, getFriendRequests);
router.post('/requests/approve/:id', authenticate, approveFriendRequest);
router.post('/requests/deny/:id', authenticate, denyFriendRequest);
router.get('/', authenticate, getFriends);
router.get('/search', authenticate, getUsersByName);

export default router;
