import { ErrorRequestHandler, Request, Response } from 'express';
import HttpException from '../helpers/HttpException';

const ErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
) => {
  const { code, message } = err as HttpException;

  res.status(code || 500)
    .json({
      message,
    });
};

export default ErrorHandler;
