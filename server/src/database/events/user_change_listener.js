
import {User} from '../db';
import logger from '../../util/logger.js';

/*
{ _id:
   { _data:
      '825B7F68240000000129295A1004C39DEA64CB5340A68A8117D74E0
      4B4E746645F696400645B7F6817851C42BCEF28F0050004' },
  operationType: 'insert',
  clusterTime:
   Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1535076388 },
  fullDocument:
   { _id: 5b7f6817851c42bcef28f005, username: 'boop', email: 'hii' },
  ns: { db: 'gametrader', coll: 'users' },
  documentKey: { _id: 5b7f6817851c42bcef28f005 } }
*/
User.watch().on('change', (change)=>{
  const fullDocument = change.fullDocument;
  const namespace = change.ns;

  const id = fullDocument.id;
  const {coll, db} = namespace;
  console.log('user changed');
});
