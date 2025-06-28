const bodyParser = require("body-parser")
const express  =  require("express")
const db  =  require("./db.js")
const authRoutes =  require("./Routes/authRoutes.js")
const productRoutes =  require("./Routes/productRoutes.js")
const historyRoutes =  require("./Routes/historyRoutes.js")
require("dotenv").config()
const app  = express()
const cors = require('cors')
const http = require('http');

// middlewares
app.use(bodyParser.json())
app.use(cors())

app.use("/auth",authRoutes)
app.use("/products",productRoutes)
app.use("/predict",historyRoutes)

app.get("/",(req,res)=>{
    res.send("MERN auth server is Running")
})

app.listen(process.env.PORT || 3000 ,process.env.HOST_NAME, ()=>{
    console.log("Auth server is running on this port",process.env.PORT || 3000)
})