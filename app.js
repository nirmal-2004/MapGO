//external imports
const express = require('express');
const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//internal imports
dotenv.config({path: './config.env'}); //only needed in app.js
require('./server/database/dbConnect') //runs conn func itself
const User = require('./server/model/userSchema');


const app = express();
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
  console.log(`server live on http://localhost:${PORT}`);
})

//linking routes to app
app.use(express.json());
app.use(require('./server/routes/auth'));


// app.use(bodyParser.json());
