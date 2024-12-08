import axios from 'axios';
import config from '../../../config';
import prisma from '../../../shared/prisma';
import { SSLService } from '../SSL/ssl.service';
import { PaymentStatus } from '@prisma/client';
const initPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findFirstOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    contactNumber: paymentData.appointment.patient.contactNumber,
  };

  const result = await SSLService.initPayment(initPaymentData);

  return {
    paymentUrl: result.GatewayPageURL,
  };
};

// ! SSL COMMERZ IPN LISTENER QUERY PARAMS EXAMPLE
// as amount=1150.00&bank_tran_id=151114130739MqCBNx5&card_brand=VISA&card_issuer=BRAC+BANK%2C+LTD.&card_issuer_country=Bangladesh&card_issuer_country_code=BD&card_no=432149XXXXXX0667&card_type=VISA-Brac+bank¤cy=BDT&status=VALID&store_amount=1104.00&store_id=alsha67475fcf219ce&tran_date=2015-11-14+13%3A07%3A12&tran_id=5646dd9d4b484&val_id=151114130742Bj94IBUk4uE5GRj&verify_sign=e0a68573f3c5dfa6c74b4b7cff561ce6&verify_key=amount%2Cbank_tran_id%2Ccard_brand%2Ccard_issuer%2Ccard_issuer_country%2Ccard_issuer_country_code%2Ccard_no%2Ccard_type%2Ccurrency%2Cstatus%2Cstore_amount%2Cstore_id%2Ctran_date%2Ctran_id%2Cval_id

const validatePayment = async (payload: any) => {
  //! IN PRODUCTION WE SHOULD UNCOMMENT THE BELOW LINES. WE HAVE TO USE REAL URL INSTEAD OF LOCALHOST TO USE THIS VALIDATION

  // if (!payload || !payload.status || !(payload.status === 'VALID')) {
  //   return {
  //     mesaage: 'Invalid Payment!',
  //   };
  // }

  // const response = await SSLService.validatePayment(payload);

  // if (response?.status !== 'VALID') {
  //   return {
  //     message: 'Payment Failed!',
  //   };
  // }

  //! IN PRODUCTION WE SHOULD COMMENT THE BELOW LINE
  const response = payload;

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: payload.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });

  return {
    message: 'Payment Successful!',
  };
};

export const PaymentService = {
  initPayment,
  validatePayment,
};
