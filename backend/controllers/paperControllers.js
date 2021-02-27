const PaperModel = require("../models/paperModel.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const HandleError = require("../utils/handleError.js");

exports.newPaper = catchAsyncError(async (req, res, next) => {
  const { title, object, content, category } = req.body;

  const newPaper = await PaperModel.create({
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
    paper: newPaper,
  });
});

//arcticle/:id
exports.updatePaper = catchAsyncError(async (req, res, next) => {
    const paper = await PaperModel.findById(req.params.id);

    if (!paper) {
      return next(new HandleError("article introuvable", 404));
    }
  
  
    if (paper.author !== req.user._id) {
      return next(
        new HandleError("Vous n'êtes pas le propriétaire de cette article...", 401)
      );
    }

  const updatedPaper = await PaperModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
      success : true,
      message : "Votre article a bien été modifier",
      paper : updatedPaper
  })
});

exports.deletePaper = catchAsyncError(async (req, res, next)=>{
    const paper = await PaperModel.findById(req.params.id);

    if (!paper) {
      return next(new HandleError("article introuvable", 404));
    }
  
    console.log(req.user._id);
    console.log(paper.author);

  
    if (paper.author !== req.user._id) {
      return next(
        new HandleError("Vous n'êtes pas le propriétaire de cette article...", 401)
      );
    }

    await paper.remove()

    res.status(200).json({
        success : true,
        message : "Article supprimé"
    })
}) 
