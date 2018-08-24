
import mongoose from 'mongoose';
import config from '../config/configuration.js';

export * from './register_models';
import './events/index.js';

mongoose.connect(config.db.db_url, {
  // New url parser must specify port
  useNewUrlParser: true,
  // Ipv4 or 6.
  family: 4,
  // Number of sockets to keep open.
  poolSize: 5,
});

// Set debug if it is set in config.
mongoose.set('debug', config.db.debug);

export const Connection = mongoose.connection;
export default mongoose.connection;
