import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../libs/core/base-controller';
import { WorkoutService } from './workout.service';
import { AuthRequest } from '../../libs/middlewares/auth.middleware';

class WorkoutController extends BaseController {
  private workoutService = new WorkoutService();

  public getById = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const workoutId = req.params.id;
      const workout = await this.workoutService.getById(workoutId);
      this.sendResponse(res, workout, 200);
    });

  public getAll = (req: AuthRequest, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const userId = req.user?.id as string;
      const { page, perPage } = req.query;
      const data = await this.workoutService.getAll(
        userId,
        parseInt(page as string) || 1,
        parseInt(perPage as string) || 10,
      );
      this.sendResponse(res, data, 200);
    });

  public create = (req: AuthRequest, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const userId = req.user?.id as string;
      const workout = await this.workoutService.create(userId, req.body);
      this.sendResponse(res, workout, 201);
    });

  public update = (req: AuthRequest, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      console.log(req.body);
      const userId = req.user?.id as string;
      const workoutId = req.params.id;
      const updated = await this.workoutService.update(
        userId,
        workoutId,
        req.body,
      );
      this.sendResponse(res, updated, 200);
    });

  public delete = (req: AuthRequest, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const userId = req.user?.id as string;
      const workoutId = req.params.id;
      await this.workoutService.delete(userId, workoutId);
      this.sendResponse(res, {}, 200);
    });
}

export { WorkoutController };
