const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  paper: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

LikeSchema.statics.getLikeNb = async function (paperId) {
  const likesNb = await this.find({ paper: paperId }).countDocuments();

  console.log(likesNb);

  try {
    await this.model("Paper").findByIdAndUpdate(
      paperId,
      {
        likesNb,
      },
      {
        runValidator: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

LikeSchema.statics.addUsersLike = async function (userId, paperId) {
  try {
    await this.model("Paper").findByIdAndUpdate(paperId, {
      $push: {
        usersLike: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

LikeSchema.statics.removeUsersLike = async function (userId, paperId) {
  try {
    await this.model("Paper").findByIdAndUpdate(paperId, {
      $pull: {
        usersLike: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

LikeSchema.post("save", function () {
  this.constructor.addUsersLike(this.user, this.paper);
  this.constructor.getLikeNb(this.paper);
});

LikeSchema.pre("remove", function () {
  this.constructor.removeUsersLike(this.user, this.paper);
  // this.constructor.getLikeNb(this.paper);
});

LikeSchema.post("remove", function () {
  this.constructor.getLikeNb(this.paper);
});

module.exports = mongoose.model("Like", LikeSchema);
