const errorHandler = function(error, documentOrQueryResult, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(); // The `update()` call will still error out.
  }
};
/*

*/
export default (schema) => {
  let keys = [
    'save',
    'validate',
    'update',
    'remove',
    'count',
    'find',
    'findOne',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
  ].forEach((key)=> schema.post(key, errorHandler));
};
