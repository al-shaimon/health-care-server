import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';

const router = express.Router();

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
    } catch (err) {
      next(err);
    }
  };
};

router.post('/', auth('ADMIN', 'SUPER_ADMIN'), userController.createAdmin);

export const userRoutes = router;
