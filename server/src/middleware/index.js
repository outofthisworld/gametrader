import jwt from './jwt.js';
import cookieParser from 'cookie-parser';
import header from './headers';
import reqlogger from './reqlogger.js';
import graphql from './graphql.js';
import deserializeUser from './deserialize_user.js';

export default (app)=>{
  app.use(header);
  /*
        cookieParser(secret, options)
        secret a string or array used for signing cookies. This is optional and if not specified, will not parse signed cookies.
         If a string is provided, this is used as the secret. If an array is provided, an attempt will be made to unsign the cookie with each secret in order.

        options an object that is passed to cookie.parse as the second option. See cookie for more information.
        decode a function to decode the value of the cookie
    */
  app.use(cookieParser());
  app.use(jwt);
  app.use(deserializeUser);
  app.use(reqlogger);
};
