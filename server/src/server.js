
import {default as app, httpServer} from './app';
import express from 'express';
import path from 'path';
import db from './database/db';
import before from './middleware/index';
import routes from './routes/index';
import errors from './middleware/errors/index';
import config from './config/configuration';
import logger from './util/logger';

db.once('open', ()=>{
  // Set the config
  app.set('config', config);
  app.set('logger', logger);

  // Handle any primary middleware before any routes are taken
  before(app);

  app.use(express.static(path.resolve(__dirname, 'static')));

  // Handle any specific routes
  routes(app);
  // Any error handling middleware that will be called
  // after route specific middleware
  errors(app);


  httpServer.listen(config.server.PORT || 3000, ()=>{
    logger.info(`Server started listening on  
        port ${config.server.PORT || 3000}`);
  });
});

db.on('error', (err)=>{
  logger.info(`Failed to connect to db, error ${err.message}`);
});


export {default as default, httpServer} from './app';
export {default as socketIo, socketEventStream} from './socketIo/index';
