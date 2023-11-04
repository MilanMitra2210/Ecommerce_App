const { hashPassword } = require('../helpers/authHelper.js');
const userModel = require('./../models/userModel.js');
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
        const user = await new userModel({name, email, phone, address, password: hashedPassword}).save();;

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
module.exports = {registerController};