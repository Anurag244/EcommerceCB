const Product = require('./Models/Product');
const {productSchema,reviewSchema}=require('./schema');


const validateProduct = (req,res,next)=>{
    let{name,img,price,desc}=req.body;
    const {error}=productSchema.validate({name,img,price,desc})
    if(error)
    {
    const msg=error.details.map((err)=>err.message).join('.')
    return res.render('error',{err:msg})
    }
    next();
}

const validateReview=(req,res,next)=>{
    let{rating,comment}=req.body;
    const {error}=reviewSchema.validate({rating,comment})
    if(error)
    {
    const msg=error.details.map((err)=>err.message).join('.')
    return res.render('error',{err:msg})
    }
    next();
}


const isLoggedIn = async(req,res,next)=>{
    if(!req.isAuthenticated() && req.xhr)
    {
        return res.error({msg:'u need to login first'})
    }
    
        if(!req.isAuthenticated())
        {
        req.flash('error','you need to login');
        return res.redirect('/login')
    }

    next();
}
const isSeller = (req,res,next)=>{
    let {id} = req.params;
    if(!req.user.role){
        req.flash('error',"u do not have the permission");
        return res.redirect('/product');
    }
    else if(req.user.role != 'seller')
    {
        req.flash('error','u do not have the permission');
        return res.redirect(`/product/${id}`)
    }
    next();
}

const isProductAuthor = async(req,res,next)=>{
    let {id} = req.params;
    let product = await Product.findById(id);
    if(!product.author.equals(req.user._id)){
     req.flash('error','invalid product');
     return res.redirect(`/product/${id}`);
    }
   next();
}


module.exports= {isLoggedIn,validateReview,isSeller,isProductAuthor,validateProduct}