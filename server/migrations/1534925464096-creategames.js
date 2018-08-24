'use strict';
import GameSchema from '../src/database/models/Game.js';
import UserSchema from '../src/database/models/User.js';
import no_throw from '../src/util/no_throw.js';

import mongoose from 'mongoose';

const con = mongoose.createConnection('mongodb://localhost:27017/gametrader')
const Game = con.model('Game',GameSchema);
const User = con.model('User',UserSchema);

/**
 * Make any changes you need to make to the database here
 */
exports.up = async function up (done) {

  /*
    name:{
        type:String,
        required:true
    },
    description:{ type:String, required:true },
    imageURI:String,
    services:{
        type:[{type: Schema.Types.ObjectId,ref:'Service'}]
    }
  */  
  const [err,game] = await no_throw(Game.create({
    name:"Runescape old school",
    description:"Runescape old school"
  }))

  const [error,user] = await no_throw(User.create({
        username:"fofo1fofo",
        email:"f1@hello.com",
        password:"mypassword",
        addressLineOne:"one",
        addressLineTwo:"two",
        postalCode:111,
        city:"Auckland",
    }))

  if(err || error){
    done(err||error)
  }else{
    done();
  }
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down(done) {
  Game.remove({}).then(()=>{
  }).catch(err=>done(err));

  User.remove({}).then(()=>{
      done();
  }).catch(err=>done(err));
};
