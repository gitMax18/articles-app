const catchAsyncError = require("../utils/catchAsyncError.js");
const HandleError = require("../utils/handleError.js");
const LikeModel = require("../models/likeModel.js");
const likeModel = require("../models/likeModel.js");

//api/v1/paper/:paperId/likes
exports.manageLike = catchAsyncError(async (req, res, next) => {
  let like = await LikeModel.findOne({ paper: req.params.paperId, user: req.user._id });

  if (like) {
    await like.remove();

    return res.status(200).json({
      success: true,
      message: "like supprimé",
    });
  }

  // await likeModel.create({
  //   user: req.user._id,
  //   paper: req.params.paperId,
  // });

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
// exports.removeLike = catchAsyncError(async (req, res, next) => {
//   const like = await LikeModel.findOne({ user: req.user._id, paper: req.params.paperId });

//   console.log(like);

//   if (!like) {
//     return next(new HandleError("Like introuvable", 404));
//   }

//   if (like.user.toString() !== req.user._id.toString()) {
//     return next(new HandleError("Vous n'ête pas authorizé", 401));
//   }

//   await like.remove();

//   res.status(201).json({
//     success: true,
//     message: "Like supprimé",
//   });
// });
