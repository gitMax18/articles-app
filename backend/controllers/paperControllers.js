const PaperModel = require("../models/paperModel.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const HandleError = require("../utils/handleError.js");
const ApiFeatures = require("../utils/apiFeatures.js");

exports.newPaper = catchAsyncError(async (req, res, next) => {
  const { title, object, content, category } = req.body;

  const paper = await PaperModel.create({
    title,
    object,
    content,
    category,
    author: req.user._id,
    reviews: [],
    like: [],
  });

  res.status(201).json({
    success: true,
    message: "Article créer",
    paper,
  });
});

//arcticle/:id
exports.updatePaper = catchAsyncError(async (req, res, next) => {
  let paper = await PaperModel.findById(req.params.id);

  if (!paper) {
    return next(new HandleError("article introuvable", 404));
  }

  if (paper.author.toString() !== req.user._id.toString()) {
    return next(
      new HandleError("Vous n'êtes pas le propriétaire de cet article...", 401)
    );
  }

  paper = await PaperModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Votre article a bien été modifier",
    paper,
  });
});

exports.deletePaper = catchAsyncError(async (req, res, next) => {
  const paper = await PaperModel.findById(req.params.id);

  if (!paper) {
    return next(new HandleError("article introuvable", 404));
  }

  if (paper.author.toString() !== req.user._id.toString()) {
    return next(
      new HandleError("Vous n'êtes pas le propriétaire de cet article...", 401)
    );
  }

  await paper.remove();

  res.status(200).json({
    success: true,
    message: "Article supprimé",
  });
});

// /papers?keyword=manchester&category=autres&limit=10&page=1
// api/v1/papers
// api/v1/user/:userId/papers
exports.getAllPapers = catchAsyncError(async (req, res, next) => {
  if (req.params.userId) {
    const papers = await PaperModel.find({ author: req.params.userId });
    res.status(200).json({
      success: true,
      papers,
      totalResultCount: papers.length,
    });
  }
  const resPerPage = parseInt(req.query.limit) || 10;

  const apiFeatures = new ApiFeatures(PaperModel, req.query).search();
  let papers = await apiFeatures.query;

  const totalResultCount = papers.length;

  apiFeatures.pagination(resPerPage);
  papers = await apiFeatures.query.populate({
    path: "author",
    select: "pseudo",
  });

  res.status(200).json({
    success: true,
    papers,
    resPerPage,
    totalResultCount,
  });
});

exports.getPaper = catchAsyncError(async (req, res, next) => {
  const paper = await PaperModel.findById(req.params.id).populate([
    {
      path: "author",
      select: "pseudo",
    },
    {
      path: "reviews",
      populate: {
        path: "user",
        select: "pseudo",
      },
    },
  ]);

  if (!paper) {
    return next(new HandleError("Article introuvable...", 404));
  }

  res.status(200).json({
    success: true,
    paper,
  });
});

// exports.getUserPapers = catchAsyncError(async (req, res, next) => {
//   const papers = await PaperModel.find({ author: req.user._id });

//   res.status(200).json({
//     success: true,
//     papers,
//   });
// });
