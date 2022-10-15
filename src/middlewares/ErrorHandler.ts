import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import HttpException from '../helpers/HttpException';

const ErrorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    res.status(400).json({ message: err.issues });
  }
  const { code, message } = err as HttpException;

  res.status(code || 500)
    .json({
      message,
    });
};

export default ErrorHandler;
