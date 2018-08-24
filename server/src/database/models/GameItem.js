import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GameItem = new Schema({
    game:{type:Schema.Types.ObjectId,ref:'Game',required:true},
    saleType:{type:String,validator:(type)=>{
        //Auction and offer have fixed prices, sale is percentage
        return type == 'Auction' || type === 'Sale' || type==='Offer'
    }},
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    offers:[
        {
            description:{type:String},
            user:{type:Schema.Types.ObjectId,ref:'User'}
        }
    ],
    bids:[{
        amount:{type:Number,required:true},
        bidder:{type:Schema.Types.ObjectId,ref:'User'},
        bidDate:{type:Date}
    }]
});

export default GameItem;