const jwt = require("jsonwebtoken");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const pdfText = require("pdf-text");
const Applicant = require('../models/applicants');
require('dotenv').config();
const { Ollama } = require("@langchain/community/llms/ollama");
const { encryptData, decryptData } = require('../utils/encryption');


const ollama = new Ollama({
    baseUrl: "http://127.0.0.1:11434",
    model: "smollm2",
    timeout: 60000,
    temperature: 0.7,
});


const extractTextFromPDF = (filePath) => {
    return new Promise((resolve, reject) => {
        pdfText(filePath, (err, chunks) => {
            if (err || !chunks.length) {
                reject("Failed to extract text or no text found");
            } else {
                resolve(chunks.join(" "));
            }
        });
    });
};

const ExtractText = async (req, res) => {
    let filePath;
    try {
        //  Validate JWT token
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ msg: "No token provided" });

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ msg: "Invalid token" });
        }

     
        const { url } = req.body;
        if (!url) return res.status(400).json({ msg: "URL is required" });

        // Download and save PDF
        const response = await axios.get(url, { responseType: "arraybuffer" });
        filePath = path.join(__dirname, "temp.pdf");
        fs.writeFileSync(filePath, response.data);

        // Extract text from PDF
        const rawtext = await extractTextFromPDF(filePath);
        console.log("Extracted Text:", rawtext);

        const prompt = `
        Extract the following details from the resume text and return a valid JSON object:

        {
          "name": "<Full Name>",
          "email": "<Email>",
          "education": {
            "degree": "<Degree>",
            "branch": "<Branch>",
            "institution": "<Institution>",
            "year": "<Year>"
          },
          "experience": {
            "job_title": "<Job Title>",
            "company": "<Company Name>",
            "start_date": "<Start Date>",
            "end_date": "<End Date>"
          },
          "skills": ["<Skill 1>", "<Skill 2>", "<Skill 3>"],
          "summary": "<write a Short summary about the candidate profile>"
        }

        Resume Text:
        """${rawtext}"""
        `;

        const aiResponse = await ollama.invoke(prompt);
        console.log("Ollama Response:", aiResponse);

        let parsedData;
        try {
            parsedData = JSON.parse(aiResponse.trim());
            if (!parsedData.name || !parsedData.email) {
                return res.status(400).json({ msg: "Missing required fields in AI response" });
            }
        } catch (error) {
            console.error("Invalid JSON from Ollama:", aiResponse);
            return res.status(500).json({ msg: "Invalid JSON format from AI" });
        }

        // Store in MongoDB
        const newApplicant = new Applicant(parsedData);
        await newApplicant.save();
        console.log("Data saved in MongoDB");

        res.status(200).json({
            msg: "Text extracted and structured successfully",
            data: parsedData
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ msg: "Server error" });
    } finally {
       
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

module.exports = { ExtractText };
