import jwt, { JwtPayload, SignOptions, Secret } from 'jsonwebtoken';
import config from '../config/config';
import { StringValue } from 'ms';

export class Token {
  private secretKey: Secret;

  constructor(secretKey: Secret) {
    this.secretKey = secretKey;
  }

  createToken(
    payload: object,
    expiresIn: StringValue | number = '24h',
  ): string {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, this.secretKey, options);
  }

  verifyToken(token: string): {
    valid: boolean;
    payload?: JwtPayload | string;
    error?: string;
  } {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: (error as Error).message };
    }
  }
}

export const token = new Token(config.JWTsecret);
