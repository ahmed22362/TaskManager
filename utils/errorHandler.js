const AppError = require("./AppError")
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: "Something went wrong, please try again" })
}

module.exports = errorHandler
