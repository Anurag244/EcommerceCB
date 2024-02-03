const express=require('express');
const { validate } = require('./../Models/Product');
const Product = require('./../Models/Product');
const {validateProduct,isLoggedIn, isSeller, isProductAuthor}=require('../middleware');
const router=express.Router();



router.get('/product',async(req,res)=>{
    let products=await Product.find({});
    res.render('index',{products})
});

router.get('/product/new',isLoggedIn,isSeller,(req,res)=>{
    
    try{
        res.render('new');
    }
    catch(e){
        res.status(500).render('error',(err.e.message))
    }
});

router.post('/product' ,isLoggedIn,validateProduct,isSeller, async(req,res)=>{
    try{
    let {name , img , price , desc} = req.body; //by default undefined
    await Product.create({name , img , price , desc,author:req.user._id}); //automatically db save
    res.redirect('/product');
    }
    catch(e){
        res.render('error',{err:e.message})
    }
})

router.get('/product/:id',isLoggedIn,async(req,res)=>{
    let {id}=req.params;
    let foundProduct= await Product.findById(id).populate('reviews')
        // return comment.id===id;
        // return product.id==commentid;
    
    // console.log(foundComment);
    // res.send(foundComment);
    res.render('show',{foundProduct});
});

router.get('/product/:commentid/edit',isLoggedIn,isSeller, async(req,res)=>{
    let {commentid}=req.params;
    let foundId=await Product.findById(commentid);
res.render('edit',{foundId});
});

// router.patch('/product/:commentid',async(req,res)=>{
//     let {commentid}=req.params;
//     let {name,img,price,desc} = req.body;
//     await Product.findByIdAndUpdate(commentid,{name,img,price,desc});
// //   let {product2}=req.body;
// //   //console.log(comment2)
// //   foundProduct.name=product2;
//   res.redirect('/product');
// });
router.patch('/product/:id',isLoggedIn,isSeller,isProductAuthor, async(req,res)=>{
    let {id} = req.params;
    let {name , img , price , desc} = req.body;
    await Product.findByIdAndUpdate(id , {name , img , price , desc} );
    res.redirect('/product');
})

router.delete('/product/:id',isLoggedIn,isSeller,isProductAuthor, async(req,res)=>{
    let {id}=req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/product');

})

module.exports=router;