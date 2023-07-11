const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/userSchema');

router.get('/', (req,res)=>{
    res.send(`router called this 1`);
});

// router.post('/register', (req,res)=>{
//     const {username, email, phone, password, cpassword} = req.body;

//     if(!username|| !email|| !phone|| !password|| !cpassword){
//         return res.status(422).json({error: "fill all entries"});
//     }

//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"email already in use"});
//         }

//         //unique email: new register
//         const user = new User({username, email, phone, password, cpassword});

//         user.save()
//         .then(()=>{
//             res.status(201)
//             .json({message: "user registered successfully"})
//         })
//         .catch((err)=>{
//             res.status(500)
//             .json({error: "failed to store in db"})
//         })
//     }).catch((err)=>{
//         console.log("failed to do userExist")
//     })
    
// });

router.post('/register', async (req,res)=>{

    const {username, email, phone, password, cpassword} = req.body;

    if(!username|| !email|| !phone|| !password|| !cpassword){
        return res.status(422).json({error: "fill all entries"});
    }

    try{
        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(422).json({error:"email already in use"});
        }

        else if(password != cpassword){
            res.status(422).json({error: "confirm password does not match"})
        }
        else {
            const user = new User({username, email, phone, password, cpassword});

            //after creating User
            //hashing password and cpassword
            //before .save()

            const saveUser = await user.save();
            if(saveUser){
                res.status(201).json({message: "user registered successfully"})
            }

        }

        
        
    }
    catch(err){
        console.log(err);
    }
    
});


router.post('/login', async (req,res)=>{
    try{
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({error: "fill all login entries"})
        }

        const userLogin = await User.findOne({username:username});
        if(userLogin){

            //passMatch is bool
            const passMatch = await bcrypt.compare(password, userLogin.password);
            if(passMatch){
                res.json({message:"valid credentials: successful login"});
                
                const token = await userLogin.generateAuthToken();
                console.log(token);

                res.cookie("jwt", token, {
                    expires:new Date(Date.now() + 2592000000 ),
                    httpOnly: true
                })
            }
            else{
                res.status(400).json({error: "invalid credentials"})
            }
        }
        else{
            res.json({error:"invalid credentials"})
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;
