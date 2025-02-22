const express = require('express');
const router = express.Router();

const {ExtractText}  = require("../controllers/extractText");

router.post("/", ExtractText);

module.exports = router;