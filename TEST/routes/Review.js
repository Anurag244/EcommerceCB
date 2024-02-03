const express=require('express');
const {validateProduct,isLoggedIn, isSeller, isProductAuthor,validateReview}=require('../middleware');

const Product = require('./../Models/Product');
const Review = require('./../Models/Review');

const router=express.Router();

router.post('/product/:id/rating',validateReview,async(req,res)=>{
    // console.log(req.body);
    // res.send(req.body);
    let {rating,comment}=req.body;
    let {id}=req.params;

    let product = await Product.findById(id);
    let review = new Review({rating:rating,reviews:comment});
    console.log(review)
    product.reviews.push(review);

    await product.save();
    await review.save();
    req.flash('success','Review Added Successfully');
    res.redirect(`/product/${id}`)
})
module.exports=router;