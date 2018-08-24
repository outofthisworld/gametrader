
import {httpServer} from '../server';
import {EventEmitter} from 'events';
import {User} from '../database/db';
import config from '../config/configuration';
import jwt from 'jsonwebtoken';
import logger from '../util/logger.js';
import io from 'socket.io';

const socketIo = io(httpServer);

export const socketEventStream = Object.create(EventEmitter.prototype);


socketIo.on('connection', (socket) => {
  socket.use(function([eventName, message], next) {
    if (message.token) {
      jwt.verify(message.token, config.secrets.login_jwt.secret,
        function(err, decoded) {
          if (err) {
            next(err);
          } else {
            const token = decoded;
            User.findOne({username: token.user.username})
              .exec().then((user) => {
                message.token = token;
                message.user = user;
                next();
              }).catch((err) => {
                message.user = null;
                next(err);
              });
          }
        });
    } else {
      message.user = null;
      next();
    }
  });

  socket.use(([eventName, message], next) => {
    logger.socketIo(`Incoming socket IO message :
     ${eventName} ${JSON.stringify(message)} from 
    [${message.user?message.user.username:'anon'}]`);
    next();
  });

  const sendToUser = (message) => {
    // Check if this socket is the specified user (message.user)
    // if it is send them the message
  };

  const sendToAuthenticated = (message) => {

  };

  const sendToAll = (message) => {

  };

  const disconnectUser = (message) => {

  };

  const sendFiltered = (message) => {
    const filter = message.filter;
    if (filter(socket)) {
      // send the message
    }
  };

  socketEventStream.on('sendToUser', sendToUser);

  socketEventStream.on('sendToAll', sendToAll);

  socketEventStream.on('sendToAuthenticated', sendToAuthenticated);

  socketEventStream.on('sendFiltered', sendFiltered);

  socketEventStream.on('disconnectUser', disconnectUser);


  socket.on('disconnect', () => {
    socketEventStream.removeListener('sendToUser', sendToUser);
    socketEventStream.removeListener('sendToAll', sendToAll);
    socketEventStream.removeListener('disconnectUser', disconnectUser);
    socketEventStream.removeListener('sendToAuthenticated',
      sendToAuthenticated);
    socketEventStream.emit('disconnect', socket);
  });
});


export default socketIo;
