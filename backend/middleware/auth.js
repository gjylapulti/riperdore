const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  console.log("Token received:", token); // Log the token value received in the request

  if (!token) {
    console.error("Token missing!"); // Log an error if the token is missing
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("Decoded User ID:", decoded.id); // Log the decoded user ID

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      console.error("User not found!"); // Log an error if user is not found
      return next(new ErrorHandler("User not found", 404));
    }

    console.log("User found:", req.user); // Log the found user

    next();
  } catch (error) {
    console.error("Error decoding token:", error); // Log any decoding errors
    return next(new ErrorHandler("Please login to continue", 401));
  }
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;

  console.log("Seller token received:", seller_token); // Log the seller token received in the request

  if (!seller_token) {
    console.error("Seller token missing!"); // Log an error if the seller token is missing
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    console.log("Decoded Seller ID:", decoded.id); // Log the decoded seller ID

    req.seller = await Shop.findById(decoded.id);

    if (!req.seller) {
      console.error("Seller not found!"); // Log an error if seller is not found
      return next(new ErrorHandler("Seller not found", 404));
    }

    console.log("Seller found:", req.seller); // Log the found seller

    next();
  } catch (error) {
    console.error("Error decoding seller token:", error); // Log any decoding errors for seller token
    return next(new ErrorHandler("Please login to continue", 401));
  }
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resource!`)
      );
    }
    next();
  };
};
