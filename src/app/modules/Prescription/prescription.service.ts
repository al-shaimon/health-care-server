import { AppointmentStatus, PaymentStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IAuthUser } from '../../interfaces/common';

const insertIntoDB = async (user: IAuthUser, payload: any) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      status: AppointmentStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
    },
    include: {
      doctor: true,
    },
  });

  console.log(user, payload);
};

export const PrescriptionService = {
  insertIntoDB,
};
