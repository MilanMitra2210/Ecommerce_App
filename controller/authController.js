const { hashPassword, comparePassword } = require('../helpers/authHelper.js');
const { use } = require('../routes/authRoute.js');
const userModel = require('./../models/userModel.js');
const JWT = require('jsonwebtoken');

const registerController = async (req , res) => {
    try {
        const {name, email, password, phone, address} = req.body;

        //validation
        if(!name) {
            return res.send({error:'Name is Required'});
        }
        if(!email) {
            return res.send({error:'Email is Required'});
        }
        if(!password) {
            return res.send({error:'Password is Required'});
        }
        if(!phone) {
            return res.send({error:'Phone Number is Required'});
        }
        if(!address) {
            return res.send({error:'Address is Required'});
        }
        //check user
        const  existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Registered please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        
        //save
        const user = await new userModel({name, email, phone, address, password: hashedPassword}).save();

        res.status(200).send({
            success:true,
            message:'User Successfully Registered',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error
        });
    }
}

//Post Login
const loginController = async (req , res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message:'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message:'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.status(200).send({
            success:true,
            message:'Login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
}
//testcontroller
const testController =  (req, res) =>{
    res.send('Peotected route')
}
module.exports = {registerController, loginController, testController};