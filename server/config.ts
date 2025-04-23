import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL'] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  database: {
    url: process.env.DATABASE_URL,
  },
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
} as const; 