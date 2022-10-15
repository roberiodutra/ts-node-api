import { sign, Secret, SignOptions } from 'jsonwebtoken';

const SECRET: Secret = process.env.SECRET || 'vnetod';

interface userInfo {
  email: string
}

export default function tokenGenerator(payload: userInfo) {
  const jwtConfig: SignOptions = {
    expiresIn: '365d',
    algorithm: 'HS256',
  };
  const token = sign(payload, SECRET, jwtConfig);
  return { token };
};
