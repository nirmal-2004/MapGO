const mongoose = require('mongoose');
const DB = process.env.DB_URL;

mongoose.connect(
    DB
  ).then( ()=>{
    console.log("connection successful");
  }
  ).catch((err)=>{
    console.log(err);
    console.log("error in connection");
  })
  
  