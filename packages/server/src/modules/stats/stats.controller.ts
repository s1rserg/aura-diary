import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../libs/core/base-controller';
import { StatsService } from './stats.service';

class StatsController extends BaseController {
  private statsService = new StatsService();

  public getStats = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { userId } = req.params;
      const { period } = req.query as { period: 'week' | 'month' | 'year' };

      const stats = await this.statsService.getUserStats(userId, period);
      this.sendResponse(res, stats, 200);
    });

  public getAllPeriodsStats = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { userId } = req.params;
      const stats = await this.statsService.getAllPeriodsStats(userId);
      this.sendResponse(res, stats, 200);
    });
}

export { StatsController };
