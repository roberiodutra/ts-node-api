import bcrypt from 'bcrypt';

class Bcrypt {
  public hashPass = async (password: string) => {
    return bcrypt.hash(password, 10);
  };

  public comparePass = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
  };
}

export default new Bcrypt();
