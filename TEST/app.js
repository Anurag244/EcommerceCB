const express = require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const seedDB=require('./seed');
const productRoutes=require('./routes/product');
const reviewRoutes=require('./routes/Review');
const authRoutes=require('./routes/auth');
const cartRoutes=require('./routes/cart');
const User = require('./Models/User');
const productApi = require('./routes/api/productapi');
const LocalStrategy = require('passport-local');

const methodOverride = require('method-override');

const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash=require('connect-flash');
const passport = require('passport');
const dotenv = require('dotenv').config();
mongoose.set("strictQuery",true);

let url="mongodb+srv://anuragbajpai188:clustering@cluster0.hmj4p46.mongodb.net/projectsretryWrites=true&w=majority";

// mongoose.connect('mongodb://127.0.0.1:27017/projects')
mongoose.connect(url)
.then(()=>{
    console.log("DB CONNECTED");
})
.catch((err)=>{
   console.log('error occur');
});

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json()) 
app.use(methodOverride('_method'));//anyname inside



let configSession={
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie:{secure:true}
    cookie:{
        httpOnly:true,
        expire:Date.now()+ 7*24*60*60*1000,
        newAge:7*24*60*60*1000
    }
};

app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));



app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})


app.use(cookieParser('helloimanurag'));

// seedDB();
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);




app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

app.get('/session',(req,res)=>{
    res.send('welcome anurag');
})
app.get('/setname',(req,res)=>{
    req.session.username='Anurag';
    res.send('session added');
})

// app.get('/',(req,res)=>{
//    // res.send(req.cookies);
//     res.send(req.signedCookies)
// })
app.get('/signed',(req,res)=>{
    res.send(req.signedCookies);
})
app.get('/setcookies',(req,res)=>{
    res.cookie('mode','dark');
    res.cookie('location','delhi');
    res.cookie('username','Anurag');
    res.cookie('age',21);
    res.cookie('pass',"baba rickshaw",{signed:true});

    res.send("cookies send successfully");
});

app.get('/getcookies',(req,res)=>{
console.log(req.cookies);
let {username,age}=req.cookies;
res.send(`hello ${username} ur age is ${age}`);
})
app.get('/',(req,res)=>{
    // res.send(req.cookies);
     res.send(req.signedCookies)
 })

app.listen(process.env.PORT,()=>{
    console.log(`CONNECTED WITH SERVER: ${process.env.PORT} `);
    })