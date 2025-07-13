import dotenv from 'dotenv';

dotenv.config();

interface Config {
  databaseURL: string;
  JWTsecret: string;
}

function requireEnv(variable: string | undefined): string {
  if (!variable) {
    throw new Error(
      `${variable} is required but not defined in the environment variables`,
    );
  }
  return variable;
}

const config: Config = {
  databaseURL: requireEnv(process.env.DATABASE_URL),
  JWTsecret: requireEnv(process.env.JWT_SECRET),
};

export default config;
