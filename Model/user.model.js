const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true}
})

let UserModel = mongoose.model("user",UserSchema);

module.exports = UserModel;