const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Donation = require("../model/donation");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const router = express.Router();
const fs = require("fs");

// create donation
router.post(
  "/create-donation",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        const donationData = req.body;
        donationData.images = imageUrls;
        donationData.shop = shop;

        const donation = await Donation.create(donationData); // Changed the model reference to Donation

        res.status(201).json({
          success: true,
          donation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all donations
router.get("/get-all-donations", async (req, res, next) => {
  try {
    const donations = await Donation.find(); // Changed the model reference to Donation
    res.status(200).json({
      success: true,
      donations,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all donations of a shop
router.get(
  "/get-all-donations/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const donations = await Donation.find({ shopId: req.params.id }); // Changed the model reference to Donation

      res.status(200).json({
        success: true,
        donations,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete donation of a shop
router.delete(
  "/delete-shop-donation/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const donationId = req.params.id;

      const donationData = await Donation.findById(donationId); // Changed the model reference to Donation

      donationData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const donation = await Donation.findByIdAndDelete(donationId); // Changed the model reference to Donation

      if (!donation) {
        return next(new ErrorHandler("Donation not found with this id!", 500));
      }

      res.status(200).json({
        success: true,
        message: "Donation Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
