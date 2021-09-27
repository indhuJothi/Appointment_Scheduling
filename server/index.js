const express = require("express")
const app = express()
const cors = require('cors')
const routes = require('./routes/userRoute')


app.use(express.urlencoded({ extended: false })); 
app.use(express.json());



app.use(cors())
app.use('/users',routes)
app.listen('5000',()=>{
    console.log("Server started...")
})