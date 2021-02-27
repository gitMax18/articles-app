
const sendCookieWithToken = (user,statusCode,res) => {

    const token = user.createToken()

    res.status(statusCode).cookie("token", token, {
        maxAge : 3 * 24 * 60 * 60 * 1000, // 3 days
        httpOnly : true
    }).json({
        success : true,
        user
    })
}

module.exports = sendCookieWithToken