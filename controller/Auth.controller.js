const User = require('../model/User')
const bcrypt = require("bcryptjs");
const ErrorResponse = require('../utils/errResponse');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto')

const register = async(req, res, next) => {
    const {username, password, email} = req.body
    try{
        const user = await User.create({username,email,password})
        sendToken(user, 201, res)
    } catch(e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        return next(new ErrorResponse("No credentials provided"))
    }
    try{
        const user = await User.findOne({email}).select("+password")
        console.log(new Date())
        console.log(user.createdAt)
        if(new Date() > user.createdAt){
          return next(new ErrorResponse("Password Expired ! Please Reset your Password", 401))
      }
        if(!user){
            return next(new ErrorResponse("Email not registered!", 401))
        }
        const isMatch = await user.matchPassword(password, this.password)

        if(!isMatch){
            return next(new ErrorResponse("Wrong password",401))
        }

        //token
        sendToken(user, 200, res)
    } catch(e) {
        next(e)
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token})
}

const forgotPassword = async (req, res, next) => {
    // Send Email to email provided but first check if user exists
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      console.log(user.createdAt)
      if (!user) {
        return next(new ErrorResponse("No email could not be sent", 404));
      }
  
      // Reset Token Gen and add to database hashed (private) version of token
      const resetToken = user.getResetPasswordToken();
      user.createdAt = Date.now() + 180*1000;
      await user.save();
  
      // Create reset url to email to provided email
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
  
      // HTML Message
      const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;
  
      try {   
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });
  
        res.status(200).json({ success: true, data: "Email Sent" });
      } catch (err) {
        console.log(err);
  
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
  
        await user.save();
  
        return next(new ErrorResponse("Email could not be sent", 500));
      }
    } catch (err) {
      next(err);
    }
  };

  const resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
  
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return next(new ErrorResponse("Invalid Token", 400));
      }
  
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.status(201).json({
        success: true,
        data: "Password Updated Success",
        token: user.getSignedToken(),
      });
    } catch (err) {
      next(err);
    }
  };
  

module.exports = {register, login, forgotPassword, resetPassword}