
import graphql from '../middleware/graphql.js';

export default (app) => {
    app.use('/graphql',graphql);
}