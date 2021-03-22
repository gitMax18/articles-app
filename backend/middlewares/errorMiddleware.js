// const HandleError = require("../utils/handleError.js")

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  console.log(err.name);

  if (err.code === 11000) {
    err.message = {
      [Object.keys(err.keyValue)]: `${Object.keys(err.keyValue)} : "${Object.values(
        err.keyValue
      )}" est déjà utlisé...`,
    };
    err.statusCode = 400;
  }

  //other validation error
  if (err.name === "ValidationError") {
    err.message = {};

    Object.values(err.errors).map(({ properties }) => {
      return (err.message = { ...err.message, [properties.path]: properties.message });
    });
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    succes: false,
    message: err.message,
    // stack : error.stack,
    // code : error.code,
    err,
  });
};
