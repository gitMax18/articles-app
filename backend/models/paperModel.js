const mongoose = require("mongoose");

const paperSchema = mongoose.Schema({
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
  reviews: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      commentary: {
        type: String,
        required: true,
      },
    },
  ],
  like: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  likeNb: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Paper", paperSchema);
