const express = require("express")
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db.js');

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//rest api
app.get('/' , (req, res) =>{
    res.send("<h1>Welcome to ecommerce app</h1>")
})

//PORT
const PORT = process.env.PORT || 8080;

//run lissten
app.listen(PORT, ()=>{
    console.log(`Sever is running on mode ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
})