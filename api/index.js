const express = require("express");
const cors =  require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs')
require('dotenv').config();
const User = require('./models/User.js');

const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}))

mongoose.connect(process.env.MONGO_URL)

app.get("/test", (req, res)=> {
    res.json("test ok");
})

app.post("/register", async (req, res)=> {
    const {name, email, password} = req.body;
     const userReg = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt)
    })
    console.log(userReg);
    res.json(userReg);
})

//6bByUHrUPhzO6jQf

app.listen(4000, ()=> {
    console.log("server is listening to port: 4000")
});