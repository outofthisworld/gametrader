import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Game = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{ type:String, required:true },
    imageURI:String,
    services:{
        type:[{type: Schema.Types.ObjectId,ref:'Service'}]
    }
})

export default Game;