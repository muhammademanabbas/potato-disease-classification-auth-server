const mongoose  =  require('mongoose')
const bcrypt = require("bcrypt");

const userSchema  = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
});

userSchema.pre("save",async function(next){
    const user  =  this;
    if(!user.isModified('password')) return next()
    try {
        const password = user.password;
        const salt  =  await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(password,salt);
        user.password =  hashedPassword;
        next()
    } catch (error) {
        return next(error)
    }
})

userSchema.methods.comparePassword = async function (plainPassword) {
    try {
        const isMatch = await bcrypt.compare(plainPassword,this.password)
        return isMatch;
    } catch (error) {
        console.error("Error: ",error);
    }
}

const User = mongoose.model('user',userSchema);

module.exports  =  User;