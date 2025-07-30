import express from 'express';
import { ExerciseController } from './exercise.controller';

const router = express.Router();

const exerciseController = new ExerciseController();

router.get('/:id', exerciseController.getById);
router.get('/', exerciseController.getAll);

export default router;
