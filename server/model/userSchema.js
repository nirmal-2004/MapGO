const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//defining the shape of the document
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },    
    email: {
            type:String,
            required: true
        },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [   //array of tokens
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});


//save is the next function
userSchema.pre('save', async function (next) {

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        this.cpassword = await bcrypt.hash(this.cpassword,10);
    }
    next();
})

userSchema.methods.generateAuthToken = async function (){
    try{
        let newToken = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:newToken});
        await this.save(); //saves in db
        return newToken;

    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('register', userSchema);
module.exports = User;
