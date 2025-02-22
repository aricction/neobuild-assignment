const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { encryptData, decryptData } = require('../utils/encryption');
require('dotenv').config();


const credentials = {
    userName: "naval.ravikant",
    email: "naval@example.com",
    password: bcrypt.hashSync("0511174", 10)
};

const Login = async (req, res) => {
    try {
        let { encryptedUserName, encryptedEmail, password } = req.body;

        if (!encryptedUserName || !encryptedEmail || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let decryptedUserName, decryptedEmail;
        try {
            decryptedUserName = decryptData(encryptedUserName);
            decryptedEmail = decryptData(encryptedEmail);
        } catch (error) {
            return res.status(400).json({ error: "Invalid encrypted data" });
        }

        console.log("Decrypted userName:", decryptedUserName);
        console.log("Decrypted email:", decryptedEmail);

        if (decryptedUserName !== credentials.userName || decryptedEmail !== credentials.email) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, credentials.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { userName: credentials.userName, email: credentials.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { Login };
