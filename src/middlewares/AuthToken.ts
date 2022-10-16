import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import { ErrorTypes } from '../helpers/ErrorCatalog';

const SECRET: Secret = process.env.SECRET || 'vnetod';

const AuthToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';

  if (!token) throw new Error(ErrorTypes.TokenNotFound);

  verify(token, SECRET, (error, user) => {
    if (error) throw new Error(ErrorTypes.InvalidToken);
    res.locals.user = user;
  });
  next();
};

export default AuthToken;
