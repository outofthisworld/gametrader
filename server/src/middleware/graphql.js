
import graphqlHttp from 'express-graphql';
import schema from '../graphql/index.js';


export default graphqlHttp({
  graphiql: true,
  schema: schema,
})
;
