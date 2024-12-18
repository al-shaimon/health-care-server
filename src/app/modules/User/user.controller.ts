import { Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constant';
import { IAuthUser } from '../../interfaces/common';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created successfully!',
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor Created successfully!',
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient Created successfully!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  // console.log(req.query);
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users data fetched',
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users profile status changed!',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
  const user = req.user;

  const result = await userService.getMyProfile(user as IAuthUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My profile data fetched!',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
  const user = req.user;

  const result = await userService.updateMyProfile(user as IAuthUser, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My profile updated!',
    data: result,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
