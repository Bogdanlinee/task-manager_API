const { NewCustomError } = require('../Errors/customError.js');

const errorHandler = (err, req, res, next) => {
  if (err instanceof NewCustomError) {
    return res.status(err.statusCode).json({ success: false, msg: err.message })
  }
  return res.status(500).json({ success: false, msg: err })
}

module.exports = errorHandler;