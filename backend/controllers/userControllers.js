const UserModel = require("../models/userModel.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const HandleError = require("../utils/handleError.js")
const sendCookieWithToken = require("../utils/sendCookieWithToken.js")

// /register
exports.registerUser = catchAsyncError(async (req, res) => {

  const newUser = await UserModel.create(req.body);

  sendCookieWithToken(newUser, 201, res)

});

// /login
exports.loginUser = catchAsyncError(async (req, res, next)=> {

    const {email, password} = req.body

    if(!email || !password){
       return next(new HandleError("Veuillez entrer vos identifiants email et mot de passe", 400))
    }

    const user = await UserModel.findOne({email}).select("+password")

    if(!user){
       return next(new HandleError("Email introuvable...", 400))
    }

    const isValidPassword = await user.verifyPassword(password);

    if(!isValidPassword){
       return next(new HandleError("Mot de passe incorrect", 400))
    }

    sendCookieWithToken(user, 200, res)
})

// /logout
exports.logoutUser = catchAsyncError (async(req, res, next) => {
    res.cookie("token", "", {
        httpOnly : true,
        maxAge : 1
    }).status(200).json({
        success : true,
        message : "Vous êtes déconnecté"
    })
})

