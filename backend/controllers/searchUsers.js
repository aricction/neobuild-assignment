const jwt = require('jsonwebtoken');
const Applicant = require('../models/applicants');
require('dotenv').config();
const { decryptData } = require('../utils/encryption');


const SearchUser = async (req, res) => {
    try {
     
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ msg: "No token provided" });

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ msg: "Invalid token" });
        }

      
        const { name } = req.query;
        if (!name) return res.status(400).json({ msg: "Name is required" });

      
        const applicants = await Applicant.find();

        if (applicants.length === 0) {
            return res.status(404).json({ msg: "No applicants found" });
        }

        const formattedApplicants = applicants
        .map(applicant => ({
            name: applicant.name || "", 
            email: applicant.email,
            education: applicant.education,
            experience: applicant.experience,
            skills: applicant.skills,
            summary: applicant.summary
        }))
        .filter(applicant => applicant.name.toLowerCase().includes(name.toLowerCase()));

        res.status(200).json({ applicants: formattedApplicants });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { SearchUser };
