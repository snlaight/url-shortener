const express = require("express");
const router = express.Router();
const urlModel = require("../models/urlModel");
const userModel = require("../models/userModel");


//this route creates the short version of the URL and stores both the original URL and new created short URL in the database. it also stores the newly created short URL id in the corresponding user model.
router.post("/createshorturl", async (req, res) => {
 let email = req.body.email;
 let originalUrl = req.body.url;
  let shortUrl = Math.random().toString(36).substring(9, 15);
  let creatingUrl = await urlModel
    .create({
      longUrl: originalUrl,
      shortUrl,
      timesClicked: 0,
    })
    .then((urlCreated) => {
    console.log(urlCreated)
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
        message: `${originalUrl} URL succesfully created and stored as http://localhost:3000/SUA/${shortUrl}`,
      })
    );
  res.send(creatingUrl);
});


//route to create an account for app. all that is required is an email. IF there's time, will implement oauth google sign in/sign up.
router.post("/signup", async (req, res) => {
  let email = req.body.email;
 let createUser = await userModel
    .create({
      email
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
    res.send(createUser)
});

module.exports = router;