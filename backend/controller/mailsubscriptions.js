// subscribeController.js
const express = require("express");
const router = express.Router();
const mailchimp = require("@mailchimp/mailchimp_marketing");

// Initialize Mailchimp SDK
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

// Endpoint to handle subscription requests
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  try {
    // Add user to Mailchimp audience
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });
    res.status(200).send("User subscribed successfully!");
  } catch (error) {
    console.error("Error subscribing user:", error);
    res.status(500).send("Failed to subscribe user.");
  }
});

module.exports = router;
