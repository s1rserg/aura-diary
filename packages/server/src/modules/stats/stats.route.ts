import express from 'express';
import { StatsController } from './stats.controller';

const router = express.Router();
const statsController = new StatsController();

router.get('/:userId', statsController.getStats); // ?period=week|month|year
router.get('/:userId/all', statsController.getAllPeriodsStats);

export default router;
