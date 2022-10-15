export enum ErrorTypes {
  UserExists = 'UserExists',
  UserNotFound = 'UserNotFound',
  WrongPassword = 'WrongPassword',
}

type ErrorResponseObject = {
  message: string;
  code: number;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
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
};
