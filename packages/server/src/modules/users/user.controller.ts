import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../../libs/middlewares/auth.middleware';
import { BaseController } from '../../libs/core/base-controller';
import { UserService } from './user.service';
import {
  signInRequestSchema,
  signUpRequestSchema,
} from '../../libs/common/common';

class UserController extends BaseController {
  private userService = new UserService();

  public signUp = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const { user, token } = await this.userService.create(
          name,
          email,
          password,
        );
        this.sendResponse(res, { user, token }, 201);
      },
      signUpRequestSchema,
    );

  public signIn = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { user, token } = await this.userService.signIn(email, password);
        this.sendResponse(res, { user, token }, 200);
      },
      signInRequestSchema,
    );

  public getAuthenticatedUser = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as string;
        const user = await this.userService.getById(userId);
        this.sendResponse(res, { user }, 200);
      },
    );

  public togglePrivacy = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as string;
        const user = await this.userService.togglePrivacy(userId);
        this.sendResponse(res, { user }, 200);
      },
    );
}

export { UserController };
