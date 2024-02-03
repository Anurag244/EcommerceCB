const express=require('express');
const User=require('./../Models/User');
const Product = require('../Models/Product');
const {validateProduct,isLoggedIn, isSeller, isProductAuthor}=require('../middleware');
const stripe = require('stripe')('sk_test_51MQWGNSJqE4gyTIsNsuJaCY5Oa5OAbbpoXJWorao1KQkoPdkbWfTvvKYlkZ1pRREdWVakhmINijg2Oj0jA6XFTBY005EwiyjI7')


const router=express.Router();

router.get("/user/cart",isLoggedIn,async(req,res)=>{
 let userId = req.user._id;
 let user = await User.findById(userId).populate('cart');
 
 let totalAmount=user.cart.reduce((sum,item)=>sum+item.price,0)

 res.render("cart/cart",{user,totalAmount});
})

router.post("/user/:productId/add",async(req,res)=>{
    let {productId}=req.params;
    let userId = req.user._id;
    let user = await User.findById(userId).populate('cart');
    let product=await Product.findById(productId);
    user.cart.push(product);
    await user.save();
    res.redirect("/user/cart");
});

router.get("/checkout/:id",async function(req,res)
{
    let userId = req.user.id;
    let user = await User.findById(userId).populate('cart');
    
    let totalAmount=user.cart.reduce((sum,item)=>sum+item.price,0);

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: totalAmount*2000,
            },
            quantity: user.cart.length,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:4242/cancel',
      });
    
      res.redirect(303, session.url);
})



module.exports=router;