const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating:{
        type:String,
        required:true
    },
    reviews:{
        type:String,
        trim:true
    }
    
},{timestamps:true})


let Review=mongoose.model('Review', reviewSchema);

module.exports=Review;