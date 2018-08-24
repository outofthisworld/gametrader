import jwt from 'express-jwt';
import config from '../config/configuration.js';


/**
 *  This is a description of the foo function.
 *
 *  @param {IncomingHttpRequest} req - The HttpRequest object
 *  @return {string} token the jwt token, or null
 * */
function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  } else if (req.cookies && req.cookies.auth) {
    return req.cookies.auth;
  }
  return null;
}

export default jwt({
  secret: config.secrets.login_jwt.secret,
  credentialsRequired: false,
  getToken,
});
