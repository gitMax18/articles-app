const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commentary: {
    type: String,
    required: [true, "Veuillez entrer un commentaire"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paper: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

ReviewSchema.statics.getReviewsNb = async function (paperId) {
  const reviewsNb = await this.find({ paper: paperId }).countDocuments();

  try {
    await this.model("Paper").findByIdAndUpdate(paperId, {
      reviewsNb,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("Review", ReviewSchema);
