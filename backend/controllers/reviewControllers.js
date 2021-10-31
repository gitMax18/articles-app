const PaperModel = require("../models/paperModel.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const HandleError = require("../utils/handleError.js");
const ReviewModel = require("../models/reviewModel.js");

//api/v1/papers/:paperId/reviews
exports.addReview = catchAsyncError(async (req, res, next) => {
  let review = await ReviewModel.create({
    user: req.user._id,
    commentary: req.body.commentary,
    paper: req.params.paperId,
  });

  review = await ReviewModel.findById(review._id).populate({
    path: "user",
    select: "pseudo",
  });

  ReviewModel.getReviewsNb(req.params.paperId);

  res.status(201).json({
    success: true,
    message: "Commentaire ajouté",
    review,
  });
});

//api/v1/reviews/:id
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  console.log("hello");
  let review = await ReviewModel.findById(req.params.id);
  if (!review) {
    return next(new HandleError("Commentaire introuvable", 404));
  }

  if (review.user.toString() !== req.user._id.toString()) {
    return next(new HandleError("Vous n'ete pas authorizé", 403));
  }
  await ReviewModel.getReviewsNb(review.paper);

  console.log("salut");
  await review.remove();

  res.status(200).json({
    success: true,
    message: "Commentaire supprimé",
    id: review._id,
  });
});

//api/v1/papers/:paperId/reviews
exports.updateReview = catchAsyncError(async (req, res, next) => {
  let review = await ReviewModel.findById(req.body._id);
  if (!review) {
    return next(new HandleError("Commentaire introuvable", 404));
  }

  if (review.user.toString() !== req.user.id) {
    return next(new HandleError("Vous n'ete pas authorizé", 403));
  }

  review = await ReviewModel.findByIdAndUpdate(
    req.body._id,
    {
      commentary: req.body.commentary,
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "user",
    select: "pseudo",
  });

  res.status(200).json({
    success: true,
    message: "Commentaire modifié",
    review,
  });
});
