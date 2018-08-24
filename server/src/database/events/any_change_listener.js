import {User, Game, Service} from '../db';
import logger from '../../util/logger.js';

[
  User,
  Game,
  Service,
].forEach((model)=>{
  model.watch().on('change', (change)=>{
    logger.info(`
                A database event (${change.operationType}) has
                been raised on db ${change.ns.db} collection ${change.ns.coll}

                ${JSON.stringify(change.fullDocument)}
              
    `);
  });
});

