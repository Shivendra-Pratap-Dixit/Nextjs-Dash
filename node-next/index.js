const cookieParser = require("cookie-parser");
const express=require("express");
const session=require("express-session");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cors=require("cors")
const app=express();
const User=require("./model/user.model")
require("dotenv").config()
const mongoose=require("mongoose");
const router = require("./routes/people.route");

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:process.env.Secret,
    resave:false,
    saveUninitialized:false
}))


app.use(cors({
    origin:"http://localhost:3000",
    credentials:true

}))
const Port=process.env.Port||8000


const authToken=(req,res,next)=>{
    const token=req.cookies.token
    console.log(token)
    if(!token)return res.status(401).send("Invalid token please login")
    jwt.verify(token,process.env.Secret,(err,user)=>{
if(err)return res.status(403).send("token went wrong");
req.user=user;
next();
})
}



app.post("/register",async(req,res)=>{
    const user=await User.findOne({username:req.body.username})
    if(user) return res.status(400).send("User already registered")
    try {
        const hassPass=await bcrypt.hash(req.body.password,5);
        const newuser=new User({username:req.body.username,password:hassPass})
        await newuser.save()
        res.status(201).send("User registered successfully")
    } catch (error) {
        res.status(500).send(error,"Something went wrong")
    }

})
app.post("/login",async(req,res)=>{
    try {
    const user=await User.findOne({username:req.body.username});
    if(!user){
        res.status(404).send("User not found");
    }
        if(await bcrypt.compare(req.body.password,user.password)){
            const accessToken=jwt.sign({username:user.username},process.env.Secret,{expiresIn:"1d"});
            res.cookie('token',accessToken,{httpOnly:true, secure:false, sameSite:"lax", domain:"localhost"});
            res.status(200).send("Logged in successfully")
        }else{
            res.status(401).send("check your credentials");
        }
    } catch (error) {
        res.status(500).send(error)
    }
})


app.get("/users", async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving users");
    }
  });


  app.post("/logout", (req,res) => {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
  });
  app.use("/people",router)

app.get("/",(req,res)=>{
    res.send("Welcome to Demo App")
})

app.listen(Port,async()=>{
    try {
        await mongoose.connect(process.env.MongoURI)
        console.log(`Server is running at ${Port} and Connected to DB`)
    } catch (error) {
        console.log(error)
    }
    
})