import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../helpers/ErrorCatalog';

const ErrorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const response = err.issues.map((z) => z.message);
    res.status(400).json({ message: response });
  }
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { code, message } = mappedError;
    res.status(code).json({ message });
  }

  res.status(500).json({ message: 'Internal Error' });
};

export default ErrorHandler;
