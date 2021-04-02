const UserModel = require("../models/userModel.js");
const PaperModel = require("../models/paperModel.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const HandleError = require("../utils/handleError.js");
const sendCookieWithToken = require("../utils/sendCookieWithToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const { now } = require("mongoose");

// /register
exports.registerUser = catchAsyncError(async (req, res) => {
  const newUser = await UserModel.create(req.body);

  sendCookieWithToken(newUser, 201, res, `Bienvenue sur Thot ${req.body.pseudo} !`);
});

// /login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new HandleError(
        { email: "Veuillez entrer vos identifiants email et mot de passe" },
        400
      )
    );
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new HandleError({ email: "Email introuvable..." }, 400));
  }

  const isValidPassword = await user.verifyPassword(password);

  if (!isValidPassword) {
    return next(new HandleError({ password: "Mot de passe incorrect" }, 400));
  }

  sendCookieWithToken(user, 200, res, `Vous êtes connecté ${user.pseudo}`);
});

// /logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      maxAge: 1,
    })
    .status(200)
    .json({
      success: true,
      message: "Vous êtes déconnecté",
    });
});

// get user

exports.getUser = catchAsyncError(async (req, res, next) => {
  if (req.user._id.toString() !== req.params.id) {
    return next(new HandleError({ email: "Votre profil ID ne correspond pas..." }, 401));
  }

  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return next(new HandleError({ email: "Utilisateur introuvable..." }, 400));
  }

  const papers = await PaperModel.find({ author: req.params.id }).populate({
    path: "author",
    select: "pseudo",
  });

  res.status(200).json({
    success: true,
    user,
    papers,
  });
});

//update user
exports.updateUserProfil = catchAsyncError(async (req, res, next) => {
  console.log(req.body);

  const newData = { pseudo: req.body.pseudo, email: req.body.email };

  const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, newData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user: updatedUser,
    message: "Votre profil a bien été modifié",
  });
});

// update password
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).select("password");

  const isValidPassword = await user.verifyPassword(req.body.password);

  if (!isValidPassword) {
    return next(new HandleError("Mot de passe incorrect", 401));
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Votre mot de passe à bien été modifié",
  });
});

// delete user

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    next(new HandleError("Utilisateur introuvable", 404));
  }

  await PaperModel.deleteMany({ author: user._id });

  user.remove();

  res.status(201).json({
    success: true,
    message: "Votre profil a été supprimer",
  });
});

//api/v1/user/forgotPassword
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new HandleError("Email introuvable", 404));
  }

  const resetToken = user.createResetToken();

  await user.save();

  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;

  const emailMessage = `Bonjour, \n\n Veuillez cliquer sur le lien ci-dessous pour changer votre mot de passe. \n\n ${url}`;

  const options = {
    email: user.email,
    text: emailMessage,
    subject: "Changement mot de passe",
  };

  try {
    await sendEmail(options);

    res.status(200).json({
      success: true,
      message: "Un Email vous a été envoyé",
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;
    await user.save();
    return next(
      new HandleError("Impossible d'envoyer un email, veuillez réesayer plus tard", 500)
    );
  }
});

// delete user

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await UserModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new HandleError("Non authorizé ou délai dépasser, veuillez réessayer", 401)
    );
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendCookieWithToken(user, 200, res, "Mot de passe modifié");
});
