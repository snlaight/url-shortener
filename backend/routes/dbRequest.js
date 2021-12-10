const express = require("express");
const router = express.Router();

const Services = require("./helpers/Service")

const signup = Services.checkforExistingEmail;
const createUrl = Services.checkForExistingUrl;

//this route creates the short version of the URL and stores both the original URL and new created short URL in the database. it also stores the newly created short URL id in the corresponding user model.
router.post("/createshorturl", createUrl)

//route to create an account for app. all that is required is an email. IF there's time, will implement oauth google sign in/sign up.
router.post("/signup",  signup);

module.exports = router;
