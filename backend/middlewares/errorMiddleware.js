module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    res.status(err.statusCode).json({
        succes : false,
        error : err.message,
        stack : err.stack
    })
}