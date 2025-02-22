const mongoose = require('mongoose');


const applicantsSchema = new mongoose.Schema({
   name:{ type: String, required: true},
   email:{ type: String, required: true, unique: true},

   education: {
    degree:{ type: String},
    branch: {type: String},
    institution :{ type: String},
    year: {type: String}
   },

   experience: [{
    job_title:{type: String},
    company: {type: String},
    start_date: {type: String},
    end_date: {type: String}
   }],

   skills: [{ type: String }],
   summary: {type: String},
});

const Applicant = mongoose.model( "Applicant" , applicantsSchema); 

module.exports = Applicant;