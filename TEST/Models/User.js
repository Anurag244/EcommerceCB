const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    //username,passport will be taken care by passport.js
    email:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        default:'buyer',
        required:true
    },
  gender:{
        type:String,
        trim:true,
        required:true
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'

        }
    ],
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'

        }
    ]
    
});

userSchema.plugin(passportLocalMongoose);

let User=mongoose.model('User',userSchema);

module.exports=User;