import bcrypt from 'bcrypt';

export default class Bcrypt {
  hashPass(password: string) {
    return bcrypt.hash(password, 10);
  }

  comparePass(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
