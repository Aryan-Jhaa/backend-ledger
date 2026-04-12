const userModel = require("../models/user.model");


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
}
module.exports = {
    userRegistrationController
}