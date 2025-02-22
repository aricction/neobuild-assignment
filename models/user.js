const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    userName:{ type:String , required:true},
    password:{ type:String, required:true}

});


const User = mongoose.model(User,  userScheme);

module.exports = User;