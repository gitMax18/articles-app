const catchAsyncError = require("../utils/catchAsyncError.js");
const HandleError = require("../utils/handleError.js");
const LikeModel = require("../models/likeModel.js");
const likeModel = require("../models/likeModel.js");
const paperModel = require("../models/paperModel.js");
// const { HandleError } = require("../utils/handleError.js");

//api/v1/paper/:paperId/likes
exports.addLike = catchAsyncError(async (req, res, next) => {
  const paper = await paperModel.findById(req.params.paperId);

  if (paper.author._id.toString() === req.user._id.toString()) {
    return next(new HandleError("Vous ne pouvez pas liké vos articles", 400));
  }

  let like = await LikeModel.findOne({ paper: req.params.paperId, user: req.user._id });

  if (like) {
    return res.status(404).json({
      success: false,
      message: "article déjà liké",
    });
  }

  const newLike = new LikeModel({
    user: req.user._id,
    paper: req.params.paperId,
  });

  like = await newLike.save();

  res.status(201).json({
    success: true,
    message: "Like ajouté",
    like,
  });
});

//api/v1/paper/:paperId/likes
exports.removeLike = catchAsyncError(async (req, res, next) => {
  const like = await LikeModel.findOne({ user: req.user._id, paper: req.params.paperId });

  if (!like) {
    return next(new HandleError("Like introuvable", 404));
  }

  if (like.user.toString() !== req.user._id.toString()) {
    return next(new HandleError("Vous n'ête pas authorizé", 401));
  }

  await like.remove();

  res.status(201).json({
    success: true,
    message: "Like supprimé",
    like,
  });
});
