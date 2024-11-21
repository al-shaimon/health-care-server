import express from 'express';
import { PatientController } from './patient.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get('/', PatientController.getAllFromDB);

router.get('/:id', PatientController.getByIdFromDB);

router.patch('/:id', PatientController.updateIntoDB);

router.delete('/:id', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), PatientController.deleteFromDB);

router.delete(
  '/soft/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PatientController.softDelete
);

export const PatientRoutes = router;
