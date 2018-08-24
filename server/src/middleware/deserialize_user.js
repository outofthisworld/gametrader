import {User} from '../database/db.js';

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export default async (req, res, next)=>{
  if (!req.user) {
    next();
  } else {
    const username = req.user.username;
    const [err, user] = await no_throw(User.findOne({username}).exec());

    if (err) {
      next(err);
    } else {
      req.locals.token = req.user;
      req.user = user;
      next();
    }
  }
};
