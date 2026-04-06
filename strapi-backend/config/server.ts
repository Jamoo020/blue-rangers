import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  cors: {
    enabled: true,
    origin: ['localhost:5173', 'localhost:3000', 'http://localhost:5173', 'http://localhost:3000', '127.0.0.1:5173', '127.0.0.1:3000'],
    credentials: true,
  },
});

export default config;
