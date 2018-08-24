import logger from '../util/logger.js';
export default (req, res, next) => {
  if (!req.user) {
    logger.info('The user for the current request is not logged in');
  } else {
    logger.info(`The user for the current request is
     logged in ${JSON.stringify(req.user)}`);
    logger.info(`JWT token: ${req.token}`);
  }
  next();
};
