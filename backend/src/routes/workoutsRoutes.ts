import { Router } from 'express';
import {
  postWorkout,
  editWorkout,
  deleteWorkout,
  getWorkoutsForPeriod,
  getUserStatistics,
  getLeaderboard,
} from '../controllers/workoutsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/period', authMiddleware, getWorkoutsForPeriod);
router.get('/stats', authMiddleware, getUserStatistics);
router.get('/stats/leaderboard', authMiddleware, getLeaderboard);
router.post('/', authMiddleware, postWorkout);
router.patch('/:id', authMiddleware, editWorkout);
router.delete('/:id', authMiddleware, deleteWorkout);
export default router;
