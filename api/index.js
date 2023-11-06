const express = require("express");
const cors =  require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const User = require('./models/User.js');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jhfjjshhjsjshw334";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
}))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get("/test", (req, res)=> {
    res.json("test ok");
})

app.post("/register", async (req, res)=> {
    const {name, email, password} = req.body;
    try {
        const userReg = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })    
        res.json(userReg);
    } catch (error) {
        res.status(422).json(error);
    }
     
})

app.post("/login", async(req, res)=> {
    const {email, password} = req.body;    
try {
    const userDoc = await User.findOne({email})
    if(userDoc) {
        const pwdOk = bcrypt.compareSync(password, userDoc.password);
        if(pwdOk) {
            jwt.sign({email: userDoc.email, id: userDoc._id, name: userDoc.name}, jwtSecret, {}, (error, token)=> {
                if(error) throw error;
                res.cookie("token", token).json(userDoc);
            } )
            
        } else {
            res.status(422).json("please check your password");
        }
    } else {
        res.json("user not found");
    }
} catch (error) {
    
}
})

app.get("/profile", (req, res)=> {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, (err, user)=> {
            if(err) throw err;
            res.json(user);
        })
    } else {
        res.json(null);
    }
   
})

//6bByUHrUPhzO6jQf

app.listen(4000, ()=> {
    console.log("server is listening to port: 4000")
});