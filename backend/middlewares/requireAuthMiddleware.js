const HandleError = require("../utils/handleError.js");
const JWT = require("jsonwebtoken");
const catchAsyncError = require("../utils/catchAsyncError.js");
const UserModel = require("../models/userModel.js");

exports.requireAuth = catchAsyncError(async (req, res, next) => {
  const encodedToken = req.cookies.token;

  if (!encodedToken) {
    return next(
      new HandleError("Vous devez être connecté pour acceder à cette fonctionnalité")
    );
  }

  const decodedToken = JWT.verify(encodedToken, process.env.JWT_SECRET);
  req.user = await UserModel.findById(decodedToken.id);


  next();
});

