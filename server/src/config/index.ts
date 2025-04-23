import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: '24h'
  },
  database: {
    url: process.env.DATABASE_URL as string
  }
}; 