const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the donation name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter the donation description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter the donation category!"],
  },
  tags: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },

  shop: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  quantity: {
    type: Number,
  },
  condition: {
    type: String,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
