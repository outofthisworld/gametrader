import mongoose from 'mongoose';
import UserSchema from './models/User.js';
import GameSchema from './models/Game.js';
import ServiceSchema from './models/Service.js';

export const User = mongoose.model('User', UserSchema);
export const Game = mongoose.model('Game', GameSchema);
export const Service = mongoose.model('Service', ServiceSchema);
