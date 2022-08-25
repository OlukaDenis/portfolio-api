"use strict";

const express = require("express");
const fileUpload = require("express-fileupload");
const functions = require("firebase-functions");
const cookieParser = require("cookie-parser");

// CORS Express middleware to enable CORS Requests.
const cors = require("cors");

// admin.initializeApp();
const app = express();

// image upload
app.use(fileUpload());

const baseRoute = "/api/v1";
const appRoutes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

// Cookie parser
app.use(cookieParser());

// Allow cors
app.use(cors());

// Body parser
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) =>
  res.status(200).json({message: "API running"}),
);

app.use(baseRoute, appRoutes);

// Error handler middleware
app.use(errorHandler);

exports.app = functions.https.onRequest(app);

// To handle "Function Timeout" exception
exports.functionsTimeOut = functions.runWith({
  timeoutSeconds: 300,
});


