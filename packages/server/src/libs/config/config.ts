import dotenv from 'dotenv';

dotenv.config();

interface Config {
  databaseURL: string;
  JWTsecret: string;
}

function requireEnv(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(
      `${key} is required but not defined in environment variables`,
    );
  }
  return value;
}

const config: Config = {
  databaseURL: requireEnv(process.env.DATABASE_URL, 'DATABASE_URL'),
  JWTsecret:
    requireEnv(process.env.JWT_SECRET, 'JWT_SECRET') || 'fallback_secret',
};

export default config;
