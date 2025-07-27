import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../libs/core/base-controller';
import { WorkoutService } from './workout.service';

class WorkoutController extends BaseController {
  private workoutService = new WorkoutService();

  public getById = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const workoutId = req.params.id;
      const workout = await this.workoutService.getById(workoutId);
      this.sendResponse(res, workout, 200);
    });

  public getAll = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const { page, perPage } = req.query;
      const data = await this.workoutService.getAll(
        parseInt(page as string) || 1,
        parseInt(perPage as string) || 10,
      );
      this.sendResponse(res, data, 200);
    });

  public create = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      console.log(req);
      const workout = await this.workoutService.create(req.body);
      this.sendResponse(res, workout, 201);
    });

  public update = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const workoutId = req.params.id;
      const updated = await this.workoutService.update(workoutId, req.body);
      this.sendResponse(res, updated, 200);
    });

  public delete = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const workoutId = req.params.id;
      await this.workoutService.delete(workoutId);
      this.sendResponse(res, {}, 200);
    });
}

export { WorkoutController };
