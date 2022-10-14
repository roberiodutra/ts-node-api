import { sign, Secret, SignOptions } from 'jsonwebtoken';

const SECRET: Secret = process.env.SECRET || 'vnetod';

export default function tokenGenerator(payload: string) {
  const jwtConfig: SignOptions = {
    expiresIn: '365d',
    algorithm: 'HS256',
  };
  const token = sign(payload, SECRET, jwtConfig);
  return { token };
};
