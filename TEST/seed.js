const mongoose = require('mongoose');
const Product = require('./Models/Product');

const products=[
    {
        name:"Iphone 15 pro",
        img:"https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
        price:124000,
        desc:"very costly phones"
    },
    {
        name:"Iphone 15 pro--2",
        img:"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww",
        price:124000,
        desc:"very costly phones"
    },
    {
        name:"Iphone 15 pro--3",
        img:"https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lfGVufDB8fDB8fHww",
        price:124000,
        desc:"very costly phones"
    },
]

async function seedDB(){
    await Product.insertMany(products);
    console.log("DB Seeds");
}

module.exports=seedDB;