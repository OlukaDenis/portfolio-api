/* eslint-disable require-jsdoc */

const ErrorResponse = require("../helpers/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = Object.assign({}, err);
  console.log("Error: ", err);
  error.message = err.message;

  const quoteRemover = (value) => value.replace(/['"]+/g, "");
  // MySQL bad field erorr
  if (err.code === "ER_BAD_FIELD_ERROR") {
    error = new ErrorResponse("Undefined fields", 400);
  }

  if (err.code === "ER_PARSE_ERROR") {
    error = new Error("Data parse error", 400);
  }

  res.status(error.statusCode || 500).json({
    status: error.statusCode || 500,
    success: false,
    message: quoteRemover(error.message) || "Server error",
  });
};

module.exports = errorHandler;
