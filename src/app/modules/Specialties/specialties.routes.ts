import express, { NextFunction, Request, Response } from 'express';
import { SpecialtiesController } from './specialties.controller';
import { fileUploader } from '../../../helpers/fileUploader';
import { SpecialtiesValidation } from './specialties.validation';

const router = express.Router();

router.get('/', SpecialtiesController.getAllFromDB);

router.post(
  '/',
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.create.parse(JSON.parse(req.body.data));

    return SpecialtiesController.insertIntoDB(req, res, next);
  }
);

router.delete('/:id', SpecialtiesController.deleteFromDB);

export const SpecialtiesRoutes = router;
