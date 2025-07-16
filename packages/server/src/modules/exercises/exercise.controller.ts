import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../libs/core/base-controller';
import { ExerciseService } from './exercise.service';

class ExerciseController extends BaseController {
  private exerciseService = new ExerciseService();

  public getById = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const exerciseId = req.params.id;
      const exercise = await this.exerciseService.getById(exerciseId);
      this.sendResponse(res, exercise, 200);
    });

  public getAll = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { page, perPage, ...filter } = req.query;
      const exercises = await this.exerciseService.getAll(
        filter,
        parseInt(page as string) || 1,
        parseInt(perPage as string) || 10,
      );
      this.sendResponse(res, exercises, 200);
    });
}

export { ExerciseController };
