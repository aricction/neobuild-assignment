const express = require('express');
const router = express.Router();

const {SearchUser}  = require("../controllers/searchUsers");

router.get("/", SearchUser);

module.exports = router;