import mongoose from "mongoose";
import logger from '../../util/logger.js';
import util from 'util';
import no_throw from '../../util/no_throw.js';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  //Users username
  username: { type:String, index:true, required:true, unique:true, validate:[
      { 
          //Add regex to validate usernames
          validator: (username)=>{
              if(username.length < 5){
                  return false;
              }
              return true;
          },
          msg: 'Username '
      }
  ]},
  //Users password
  password: { type:String, required:true},
  email: { type:String, required:true, index:true, unique:true },
  //Last known login date
  lastLogin: { type:Date },
  //Sign up date
  signUpDate: { type:Date },
  //Verification dates, so they can expire after x amount of time.
  emailVerifiedDate: {type:Date},
  voiceVerifiedDate: {type:Date},
  smsVerifiedDate:{type:Date},
  addressVerifiedDate:{type:Date},
  driversLicenceVerifiedDate:{type:Date},
  //Date user last modified password
  passwordLastModifiedDate: {type:Date},
  //True if the user has shared their location with us
  locationShared: Boolean,
  //Latitude and longitude of users locations
  knownLocations:[{lng:{type:String},lat:{type:String},date:{type:Date}}],
  //Last ipv4 login
  lastLoginIP4: {type:String},
  //Last ipv6 login
  lastLoginIP6: {type:String},
  //Any known ips
  knownIps:[{ipv4:{type:String,required:true},ipv6:{type:String,required:true},date:{type:Date,required:true}}],
  //Addr 1
  addressLineOne: {type: String, required:true},
  //Addr 2
  addressLineTwo: {type: String, required:true},
  //Postal code
  postalCode: {type:Number,required:true},
  //City
  city: {type:String,required:true},
  //State
  state: {type:String},
  //User accept TOS
  agreeToTOS: {type:Boolean},
  //Credits
  credits: {type:Number},
  //True if the user is voice verified
  voiceVerified: Boolean,
  //True if user is sms verified
  smsVerified: Boolean,
  //True if the user is email verified
  emailVerified: Boolean,
  //True if the user is drivers licence verified
  driversLicenseVerified: Boolean,
  //True if the user is address verified
  addressVerified:Boolean,
  //Ids for external services
  twitterId: {type:Number,index:true},
  facebookId: {type:Number,index:true},
  googleId: {type:Number,index:true},
  //A user can have many services
  services:{
        type:[{type: Schema.Types.ObjectId,ref:'Service'}]
  },
  messages:{
      type:[{type: Schema.Types.ObjectId,ref:'Message'}]
  }
});

UserSchema.methods.logout = function(res){
     res.clearCookie('auth')
}

/*

UserSchema.methods.hasPasswordSync = (passwordToCheck) =>{
    return bcrypt.compareSync(passwordToCheck, this.password);
}

UserSchema.methods.hasPassword = async (passwordToCheck) => {
    const userPass = this.password;
    
    const [err,matches] = await no_throw(bcrypt.compare(passwordToCheck,userPass))

    if(err || !matches){
        if(err) logger.error(err.message);
        return false;
    }else{
        return true;
    }
}*/

UserSchema.methods.updateAssociatedUsers = async function(){
    const ipv4 = this.lastLoginIpv4;
    const ipv6 = this.lastLoginIpv6;

    const associatedUsers = this.find({
        knownIps:{
            $elemMatch:{
                $or:[{ipv4:ipv4},{ipv6:ipv6}]
            }
        }
    })

    associatedUsers.forEach((u)=> {
        this.associatedUsers.push(u)
        u.associatedUsers.push(this)
    });

    let promises = []

    promises.push(this.save())

    associatedUsers.forEach(u=>{
        promises.push(u.save())
    })

    const [err,results] = await no_throw(promises.all(promises));

    if(err){
        throw new Error(err)
    }else{
        return results;
    }
}

UserSchema.post('init', function(doc) {
  logger.info('%s has been initialized from the db', doc._id);
});
UserSchema.post('validate', function(doc) {
  logger.info('%s has been validated (but not saved yet)', doc._id);
});
UserSchema.post('save', function(doc) {
  logger.info('%s has been saved', doc._id);
});
UserSchema.post('remove', function(doc) {
  logger.info('%s has been removed', doc._id);
});

export default UserSchema;
