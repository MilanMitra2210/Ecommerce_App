const mongoose = require('mongoose');
const colors = require('colors');


const connectDB = async () =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database ${con.connection.host}`);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
}
module.exports = connectDB;