const express = require('express');
const router = express.Router();

const {Login}  = require("../controllers/auth");

router.post("/", Login);

module.exports = router;