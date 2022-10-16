export enum ErrorTypes {
  UserExists = 'UserExists',
  UserNotFound = 'UserNotFound',
  WrongPassword = 'WrongPassword',
  TokenNotFound = 'TokenNotFound',
  InvalidToken = 'InvalidToken',
}

type ErrorResponseObject = {
  message: string;
  code: number;
};

type catalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const ErrorCatalog: catalog = {
  UserExists: {
    message: 'User Already Exists',
    code: 409,
  },
  UserNotFound: {
    message: 'User Not found',
    code: 404,
  },
  WrongPassword: {
    message: 'Wrong Password',
    code: 401,
  },
  TokenNotFound: {
    message: 'Token Not Found',
    code: 404,
  },
  InvalidToken: {
    message: 'Invalid Token',
    code: 401,
  },
};
