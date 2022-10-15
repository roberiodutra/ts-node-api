import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import HttpException from '../helpers/HttpException';

const ErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { code, message } = err as HttpException;

  res.status(code || 500)
    .json({
      message,
    });
};

export default ErrorHandler;
