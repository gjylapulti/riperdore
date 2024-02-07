const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  // Set default status code and message if not already defined
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Log the entire error object for better debugging
  console.error("Error:", err);

  // Check if error has a response property before accessing its data
  if (err.response && err.response.data) {
    console.error("Error Response Data:", err.response.data);
  }

  // Handle specific error types
  if (err.name === "CastError") {
    const message = `Resource not found with this ID. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token. Please try again later.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Token expired. Please try again later.`;
    err = new ErrorHandler(message, 400);
  }

  // Send JSON response with error status code and message
  res.status(err.statusCode).json({
    success: false,
    error: err.message, // Use 'error' key instead of 'message' for consistency
  });
};
