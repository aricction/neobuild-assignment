const mongoose = require('mongoose');
const db = process.env.MONGO_URI

const connectDB = async()=>{
       try {
         await mongoose.connect(db,{
            useNewUrlParser: true,
         });
         console.log("mongodb is connected");  
         
       } catch (error) {
         console.log(error);
         process.exit(1);
       }
}

module.exports = connectDB;
