const express = require("express");
const router = express.Router();
const urlModel = require("../models/urlModel");
const userModel = require("../models/userModel");

//this route creates the short version of the URL and stores both the original URL and new created short URL in the database. it also stores the newly created short URL id in the corresponding user model.
router.post("/createshorturl", async (req, res) => {
  let email = req.body.email;
  let originalUrl = req.body.url;
  let shortUrl = Math.random().toString(36).substring(9, 15);

  
  const checkForExistingUrl = await urlModel
    .findOne({ longUrl: originalUrl })
    .then((foundUrl) => {
      return foundUrl;
    });
  if (checkForExistingUrl) {
    res.send({
      status: 409,
      message: `Url already exists in DB as ${checkForExistingUrl.shortUrl}`,
    });
  } else {
  }
  let creatingUrl = await urlModel
    .create({
      longUrl: originalUrl,
      shortUrl,
      timesClicked: 0,
    })
    .then((urlCreated) => {
      console.log(urlCreated);
      return urlCreated;
    })
    .catch((e) => res.send({ status: 404, message: e }));
  await userModel
    .findOneAndUpdate(email, {
      $push: { createdUrls: creatingUrl._id },
    })
    .then((updatedUser) =>
      res.send({
        status: 200,
        message: `URL succesfully created and stored as ${shortUrl} `,
        shortUrl: `${shortUrl}`,
        redirectUrl: `http://localhost:3050/SUA/${shortUrl}`,
        longUrl: `${originalUrl}`,
      })
    );
  res.send(creatingUrl);
});

//route to create an account for app. all that is required is an email. IF there's time, will implement oauth google sign in/sign up.
router.post("/signup", async (req, res) => {
  let email = req.body.email;
  let checkForEmail = await userModel.findOne({ email }).then((userFound) => {
    return userFound;
  });
  if (checkForEmail) {
    res.send({
      status: 400,
      message: `User with ${email} already exists. Please provide another email`,
    });
  }
  let createUser = await userModel
    .create({
      email,
    })
    .then((newUser) =>
      res.send({
        status: 200,
        message: `New user with email ${email} succesfully created.`,
      })
    )
    .catch((e) =>
      res.send({ status: 400, message: `We have the following error: ${e}` })
    );
  res.send(createUser);
});

module.exports = router;
