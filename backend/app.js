const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const donation = require("./controller/donation");
const payment = require("./controller/payment");
const order = require("./controller/order");
const mailsubscriptions = require("./controller/mailsubscriptions");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const blog = require("./controller/blog");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/donation", donation);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/mailsubscriptions", mailsubscriptions);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/blog", blog);

// error handling
app.use(ErrorHandler);

module.exports = app;
