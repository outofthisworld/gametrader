
import logger from '../util/logger.js';

const env = process.env;
const mode = process.env.NODE_ENV || 'development';
const port = env.PORT || 3000;
const db_collection = 'gametrader';
const db_port = env.DB_PORT || 27017;
const db_url = env.DB_URL || `mongodb://mongoinstance:${db_port}/${db_collection}`;
const jwt_secret = env.JWT_SECRET || 'ima_important_secret';
if (mode === 'development') {
  logger.log({
    level: 'info',
    message: `
        Server configuration:
            PORT: ${port}
            DB_URL: ${db_url}
            DB_PORT: ${db_port}
            JWT_SECRET: ${jwt_secret}
        `,
  });
}

export default {
  mode,
  debug: mode === 'development',
  server: {
    port,
  },
  db: {
    db_url,
    db_port,
    debug: mode === 'development',
  },
  secrets: {
    login_jwt: {
      secret: jwt_secret,
      algorithm: 'HS256',
      expiresIn: '6h',
      audience: ['gametrader'],
      issuer: 'gametrader',
      subject: 'auth',
    },
  },
};
