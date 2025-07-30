import { Router } from 'express';
import { WorkoutController } from './workout.controller';
import authMiddleware from '../../libs/middlewares/auth.middleware';

const router = Router();
const controller = new WorkoutController();

router.get('/:id', authMiddleware, controller.getById);
router.get('/', authMiddleware, controller.getAll);
router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

export default router;
