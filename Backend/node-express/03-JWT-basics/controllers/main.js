const jwt = require("jsonwebtoken");
const {BadRequestError} = require("../errors/");

const CustomAPIError = require("../errors");
const login = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        throw new BadRequestError("please provide email and password");
    }
    // just for demo
    const id = new Date().getDate();
    const token = await jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});
    res.status(200).json({msg: "user created", token})
 }
 const dashboard = async (req,res)=> {
    const randomVal = Math.floor(Math.random()*100);
    res.status(200).json({msg: `Hello ${req.user.username}`, secret: `here is your secret ${randomVal}`});
 }
 module.exports = {login, dashboard}