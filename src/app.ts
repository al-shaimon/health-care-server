import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import { AppointmentService } from './app/modules/Appointment/appointment.service';

const app: Application = express();
app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
cron.schedule('* * * * *', () => {
  try {
    AppointmentService.cancelUnpaidAppointments();
  } catch (err) {
    console.log(err);
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hello World!',
  });
});

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUND!',
    error: {
      path: req.originalUrl,
      message: 'Your requested path is not found!',
    },
  });
});

export default app;
