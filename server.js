
const express = require('express');
const app = express();
const connectDB = require('./config/dbcon');
const login = require("./routers/login");
const extractText = require("./routers/extractText");
const searchUsers = require("./routers/searchUsers");

connectDB();


app.use(express.json());

app.get("/",(req, res)=> {
    res.send("server running")
})

app.use("/login", login);
app.use("/extractText", extractText);
app.use("/searchUsers" , searchUsers);

const PORT = 3000;

app.listen(PORT, ()=>
    console.log(`the app is running on http://localhost:${PORT}`)
)