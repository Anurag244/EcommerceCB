const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    istock:{
        type:Boolean,
        default:true,
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    author:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
 
})

let Product=mongoose.model('Product',productSchema);

module.exports=Product;