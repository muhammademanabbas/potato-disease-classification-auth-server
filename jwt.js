const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwtAuthMiddleware = (req,res,next)=>{

    const authorization  =   req.headers.authorization;
    if(!authorization) return res.status(401).json({token:"Token Not Found"})    

    const token = authorization.split(" ")[1];
    if(!token) return res.status(401).json({error:"Unauthorization"});

    try {
        const decodedPayload =  jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userDetail =  decodedPayload;
        next();
    } catch (error) {
        res.status(401).json({Token:"Invalid Token"})
    }
}

const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET_KEY);
}

module.exports  =   {jwtAuthMiddleware,generateToken}