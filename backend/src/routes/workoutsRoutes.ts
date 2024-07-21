import { Router } from 'express';
import { getAllWorkouts, getWorkoutById, getAllWorkoutsByDate, postWorkout, editWorkout, deleteWorkout } from "../controllers/workoutsController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/', authMiddleware, getAllWorkouts);
router.get('/:id', authMiddleware, getWorkoutById);
router.get('/date/:date', authMiddleware, getAllWorkoutsByDate);
router.post('/', authMiddleware, postWorkout);
router.patch('/:id', authMiddleware, editWorkout);
router.delete('/:id', authMiddleware, deleteWorkout);

export default router;