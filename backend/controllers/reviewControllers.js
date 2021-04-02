const PaperModel = require("../models/paperModel.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const HandleError = require("../utils/handleError.js");
const ReviewModel = require("../models/reviewModel.js");
const reviewModel = require("../models/reviewModel.js");

//api/v1/papers/:paperId/reviews
exports.addReview = catchAsyncError(async (req, res, next) => {
  const review = await reviewModel.create({
    user: req.user._id,
    commentary: req.body.commentary,
    paper: req.params.paperId,
  });

  reviewModel.getReviewsNb(req.params.paperId);

  res.status(201).json({
    success: true,
    message: "Commentaire ajouté",
    review,
  });
});

//api/v1/reviews/:id
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const review = await ReviewModel.findById(req.params.id);

  if (!review) {
    return next(new HandleError("Commentaire introuvable", 404));
  }

  if (review.user.toString() !== req.user.id) {
    return next(new HandleError("Vous n'ete pas authorizé", 403));
  }

  reviewModel.getReviewsNb(review.paper);
  review.remove();

  res.status(200).json({
    success: true,
    message: "Commentaire supprimé",
  });
});

//api/v1/reviews/:id
exports.updateReview = catchAsyncError(async (req, res, next) => {
  let review = await ReviewModel.findById(req.params.id);

  if (!review) {
    return next(new HandleError("Commentaire introuvable"));
  }

  if (review.user.toString() !== req.user.id) {
    return next(new HandleError("Vous n'ete pas authorizé", 403));
  }

  review = await ReviewModel.findByIdAndUpdate(
    req.params.id,
    {
      commentary: req.body.commentary,
    },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Commentaire modifié",
    review,
  });
});
