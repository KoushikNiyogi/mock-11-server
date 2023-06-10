const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const UserModel = require("../Model/user.model");
const auth = require("../Middleware/auth")
const emi = require("../Middleware/emi")
const userRouter = express.Router();

userRouter.post("/register",async (req,res)=>{
    let {email,password,name} = req.body;
    let user = await UserModel.findOne({email});
   try {
 
    if(user == null){
        bcrypt.hash(password, 5,async function(err, hash) {
            if(err){
                res.send("something is wrong with password");
            }else{
                let newUser = new UserModel({email,password:hash,name});
                await newUser.save();
                res.status(200).send({msg : "Registration successfull"})
            }
        });
    
    }else{
        res.send({msg : "User already present .Please Login!!"})
    }
   } catch (error) {
    res.send({msg : "Register failed"})
   }
})

userRouter.post("/login",async (req,res)=>{
    let {email,password} = req.body;
    let user = await UserModel.findOne({email});
   try {
 
    if(user == null){
        res.send({msg : "Register to login!!"})
    
    }else{
        bcrypt.compare(password, user.password, function(err, result) {
            // result == false
            if(result){
                var token = jwt.sign({email,date : Date() }, 'mock-10');
                res.send({msg : "login Successfull",token});
            }else{
                res.send({msg:"Wrong password"});
            }
        });
    }
   } catch (error) {
    res.send({msg : "Login failed"})
   }
})

userRouter.post("/emi",emi,async (req,res)=>{
    
   try {
     res.send({"data": {emi : req.body.emi,intrest:req.body.intrest,total:req.body.total}});
   } catch (error) {
     res.send({"msg":error})
   }
})

userRouter.get("/emi",)

module.exports = userRouter
