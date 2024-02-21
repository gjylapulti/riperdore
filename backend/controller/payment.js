const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_API_KEY);
console.log(process.env);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Log the request payload
      console.log("Request Payload:", req.body);

      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "eur",
        metadata: {
          company: "Riperdore",
        },
      });
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      res
        .status(500)
        .json({ error: "Error processing payment. Please try again later." });
    }
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = router;
