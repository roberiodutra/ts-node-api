import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ErrorCatalog, ErrorTypes } from '../helpers/ErrorCatalog';
import { ZodError } from 'zod';

const ErrorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const response = err.issues.map((z) => z.message);
    return res.status(400).json({ message: response });
  }
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = ErrorCatalog[messageAsErrorType];

  if (mappedError) {
    const { code, message } = mappedError;
    return res.status(code).json({ message });
  }

  return res.status(500).json({ message: 'Internal Error' });
};

export default ErrorHandler;
