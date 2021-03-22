const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  pseudo: {
    type: String,
    required: [true, "Veuillez entrer un pseudo"],
    unique: true,
    maxLength: [30, "votre pseudo ne peut excéder 30 caractères"],
  },
  email: {
    type: String,
    required: [true, "Veuillez entrer un email"],
    unique: true,
    validate: [validator.isEmail, "Veuillez entrer un email valide"],
  },
  password: {
    type: String,
    required: [true, "Veuillez entrer un mot de passe"],
    minLength: [6, "Votre mot de passe doit contenir un minimum de 6 caractères"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes : [{
      paper : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "Paper",
          required : true
      }
  }]
});

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")){
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.createToken = function () {
  const token = JWT.sign({ id : this._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  return token
};

module.exports = mongoose.model("User", userSchema);
