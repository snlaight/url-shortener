const express = require("express");
const router = express.Router();

import { checkforExistingEmail, checkForExistingUrl, checkforExistingUrl, createUrl } from "./helpers/Service";

//this route creates the short version of the URL and stores both the original URL and new created short URL in the database. it also stores the newly created short URL id in the corresponding user model.
router.post("/createshorturl",  checkForExistingUrl);

//route to create an account for app. all that is required is an email. IF there's time, will implement oauth google sign in/sign up.
router.post("/signup",  checkforExistingEmail);

module.exports = router;``
