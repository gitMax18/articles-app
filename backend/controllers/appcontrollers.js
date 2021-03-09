const userModel = require("../models/userModel.js");
const PaperModel = require("../models/paperModel.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const HandleError = require("../utils/handleError.js");

exports.getAppInfos = catchAsyncError(async (req, res, next) => {
  const papersNb = await PaperModel.countDocuments();

  const usersNb = await userModel.countDocuments();

  res.status(200).json({
    success: true,
    papersNb,
    usersNb,
  });
});
