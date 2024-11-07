import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AdminService } from './admin.service';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  // console.log(req.query);
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AdminService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data fetched',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.getByIdFromDB(id);
  // res.status(200).json({
  //   success: true,
  //   message: 'Admin data fetched by id',
  //   data: result,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data fetched by id',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  // try {
  const result = await AdminService.updateIntoDB(id, req.body);
  // res.status(200).json({
  //   success: true,
  //   message: 'Admin data updated successfully',
  //   data: result,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data updated successfully',
    data: result,
  });
  // } catch (err) {
  // res.status(500).json({
  //   success: false,
  //   message: err?.name || 'Something went wrong',
  //   error: err,
  // });
  //   next(err);
  // }
});

const deleteFromDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  // try {
  const result = await AdminService.deleteFromDB(id);
  // res.status(200).json({
  //   success: true,
  //   message: 'Admin data deleted successfully',
  //   data: result,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data deleted successfully',
    data: result,
  });
  // } catch (err) {
  // res.status(500).json({
  //   success: false,
  //   message: err?.name || 'Something went wrong',
  //   error: err,
  // });
  //   next(err);
  // }
});

const softDeleteFromDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  // try {
  const result = await AdminService.softDeleteFromDB(id);
  // res.status(200).json({
  //   success: true,
  //   message: 'Admin data deleted successfully',
  //   data: result,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data deleted successfully',
    data: result,
  });
  // } catch (err) {
  // res.status(500).json({
  //   success: false,
  //   message: err?.name || 'Something went wrong',
  //   error: err,
  // });
  //   next(err);
  // }
});

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
