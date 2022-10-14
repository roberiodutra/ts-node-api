import HttpException from './HttpException';

export default function throwNewError(status: number, message: string) {
  throw new HttpException(status, message);
}
