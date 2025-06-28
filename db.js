const mongoose = require("mongoose");
require('dotenv').config()

const mongoDBURL = process.env.DB_URL;

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection ; 

db.on('error', (err)=>{
    console.log("Database Error!",err)
})
db.on('disconnected', ()=>{
    console.log("Database Disconnected!")
})
db.on('connected', ()=>{
    console.log("Database Connection Successfully!")
})

module.exports = db ;