const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/** 
* - User register controller
* - POST /api/auth/register
*/

async function userRegistrationController(req,res){

    const { email, name, password } = req.body;

    const isExists = await userModel.findOne({ 
        email: email
    })

    if(isExists){
        return res.status(422).json({
            status: "failed",
            message: "User already exists"
        });
    }

    const user = await userModel.create({
        email,
        name,
        password
    })
    const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookies("token", token);
    res.status(201).json({
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

}


module.exports = {
    userRegistrationController
}
