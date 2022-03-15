const jwt = require('jsonwebtoken')
const User = require('../model/User');
const ErrorResponse = require('../utils/errResponse');

exports.protect = async (req, res, next)=>{
    let token;
    console.log(token)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
        console.log(token)

    }
    
    if(!token){
        return next(new ErrorResponse("Not authorized for this route", 401))
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        console.log(user)
        if(!user){
            return next(new ErrorResponse("No user find with this id", 404))

        }
        req.user = user
        next()
    } catch(e) {
        return next(new ErrorResponse("Not Authorized to access this route", 401))
    }
}