class NewCustomError extends Error {
  constructor(code, message) {
    super(message)
    this.statusCode = code;
  }
}

const createNewCustomError = (code, msg) => {
  return new NewCustomError(code, msg);
}

module.exports = { createNewCustomError, NewCustomError }