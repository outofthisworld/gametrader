import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Service = new Schema({
    name:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    game:{
        type: Schema.Types.ObjectId,
        ref:'Game',
        required:true
    },
    serviceType:{ //Fixed, Flexi (Flexible pricing, user must inquire about pricing)
        type:String
    },
    reviews:[{
        user:{ 
            type: Schema.Types.ObjectId,
            ref:'User',required:true,
            validate:(user)=>{
                //Ensure user has 
                return true;
            }
        },
        rating:{
            type:Number,
            required:true
        },
        description:{type:String}
    }]
})

export default Service;