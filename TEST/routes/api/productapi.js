const express=require('express');
const { isLoggedIn } = require('../../middleware');
const User = require('../../Models/User');
const router=express.Router();

router.post('/product/:productId/like',isLoggedIn,async(req,res)=>{
    // console.log(req.params.id);
    // res.send(req.params.id);
    let {productId}=req.params;
    let user=req.user;
    let isLiked = user.wishlist.includes(productId);
    if(isLiked){
        await User.findByIdAndUpdate(req.user._id,{$pull:{wishlist:productId}} )
    }
    else{
        await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:productId}} )
    }
   // console.log(isLiked);
})

module.exports=router;