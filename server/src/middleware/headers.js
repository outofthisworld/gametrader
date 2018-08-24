
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export default function(req, res, next) {
  res.set('X-Powered-By', 'gametrader');
  next();
}
