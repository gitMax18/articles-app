const mongoose = require("mongoose");

const paperSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Veuillez entrer un titre"],
    },
    object: {
      type: String,
      required: [true, "veuillez entrer l'object de votre article"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "veuillez entrer le contenu de votre article"],
    },
    category: {
      type: String,
      required: [true, "veuillez entrer une catégorie"],
      enum: {
        values: ["environnement", "société", "politique", "économie", "autres"],
        message: "Veuillez entrer une catégorie valide",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reviewsNb: {
      type: Number,
      default: 0,
    },
    likesNb: {
      type: Number,
      default: 0,
    },
    usersLike: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

paperSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "paper",
  justOne: false,
});

// paperSchema.virtual("usersLike", {
//   ref: "Like",
//   localField: "_id",
//   foreignField: "paper",
//   justOne: false,
// });

module.exports = mongoose.model("Paper", paperSchema);
