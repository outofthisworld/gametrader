
import winston from 'winston';
import _ from 'lodash';
import path from 'path';

const createLevelFilter = (levels)=>{
  if (_.isArray(levels)) {
    levels = [levels];
  }

  const func = winston.format((info, opts)=>{
    return levels.indexOf(info.level) !== -1?info:false;
  });
  return func();
};

const customFormat = winston.format.printf((i) => {
  return `[ [[[ ${i.level.toUpperCase()} ]]] ${i.timestamp} ] ${i.message.replace(/\n/g, ' ').replace(/\s\s+/g, ' ')}`;
});


export const transports = {
  // Log all errors to error.log
  error: new winston.transports.File({
    filename: 'error.log',
    level: 'error',
    format: winston.format.combine(
      createLevelFilter('error'),
      winston.format.timestamp(),
      customFormat
    ),
  }),
  info: new winston.transports.File({
    filename: 'info.log',
    level: 'info',
    format: winston.format.combine(
      createLevelFilter('info'),
      winston.format.timestamp(),
      customFormat
    ),
  }),
  socketIo: new winston.transports.File({
    filename: 'socketIo.log',
    level: 'socketIo',
    format: winston.format.combine(
      createLevelFilter('socketIo'),
      winston.format.timestamp(),
      customFormat
    ),
  }),
  // Log all trade
  trade: new winston.transports.File({filename: 'trade.log',
    level: 'trade',
    format: winston.format.combine(
      createLevelFilter('trade'),
      winston.format.timestamp(),
      customFormat
    )}),
  purchase: new winston.transports.File({filename: 'purchase.log',
    level: 'purchase',
    format: winston.format.combine(
      createLevelFilter('purchase'),
      winston.format.timestamp(),
      customFormat
    )}),
  // Log everything to combined.log
  combined: new winston.transports.File({
    filename: 'combined.log',
    format: winston.format.combine(
      winston.format.timestamp(),
      customFormat
    )}),
};

/*
  { error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
    trade: 7,
    purchase: 8 }
*/
const levelsToUse = winston.config.npm.levels;
const numLevels = Object.keys(levelsToUse).length;

const levels = _.assign({}, winston.config.npm.levels, {
  'trade': numLevels,
  'purchase': numLevels+1,
  'socketIo': numLevels+2,
});


const logColors = {
  trade: 'orange',
  purchase: 'purple',
  socketIo: 'green',
};

const logger = winston.createLogger({
  level: 0,
  levels,
  transports: [transports.error, transports.trade,
    transports.purchase, transports.combined, transports.info, transports.socketIo],
});

winston.addColors(logColors);


// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

export default logger;
