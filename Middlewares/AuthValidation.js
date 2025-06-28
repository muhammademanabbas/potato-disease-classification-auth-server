const JOI = require("joi");

const signupValidation = (req, res, next) => {
    const schema = JOI.object({
        name:JOI.string().min(4).max(100).required(),
        email:JOI.string().email().required(),
        password:JOI.string().min(4).max(100).required(),
    })
    const {error}  =  schema.validate(req.body)
    if(error){
        return res.status(400).json({error:"bad request" ,  error})
    }
    next()
};
const loginValidation = (req, res, next) => {
    const schema = JOI.object({
        email:JOI.string().email().required(),
        password:JOI.string().min(4).max(100).required(),
    })


    const {email,password}  =  req.body
    const {error}  =  schema.validate({email,password})
    if(error){
        return res.status(400).json({error:"bad request" ,  error})
    }
    next()
};
module.exports =  {
    loginValidation,
    signupValidation
}