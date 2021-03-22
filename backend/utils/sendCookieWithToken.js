const sendCookieWithToken = (user, statusCode, res, message = "") => {
  const token = user.createToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      httpOnly: true,
    })
    .json({
      success: true,
      user: { pseudo: user.pseudo, id: user._id },
      message,
    });
};

module.exports = sendCookieWithToken;
