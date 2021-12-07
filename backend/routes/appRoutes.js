const express = require("express");
const router = express.Router();
const urlModel = require("../models/urlModel");
const userModel = require("../models/userModel");

//home route of the app to render data, still TBC
router.get("/", (req, res) => {
  res.send({ status: 200, message: "Reached home route of app!" });
});


//simple route to display all of the urls currently in the DB (for testing with Postman)
router.get("/urls", async (req, res) => {
  let urls = await urlModel
    .find()
    .then((allUrls) => {
      return allUrls;
    })
    .catch((e) => {
      console.log(`we have the following error: ${e}`);
    });
  res.send(urls);
});

//simple route to display all of the users currently in the DB (for testing with postman)
router.get("/users", async (req, res) => {
  let users = await userModel
    .find()
    .then((allUsers) => {
      return allUsers;
    })
    .catch((e) => {
      console.log(`we have the following error: ${e}`);
    });
  res.send(users);
});


//this route grabs the shortlURl via the params of the query and redirects to the long/original URL stored in the database.
router.get("/SUA/:shorturl", async (req, res) => {
  const shorturl = req.params.shorturl;
  const findUrl = await urlModel.findOne({
    shortUrl: shorturl,
  });
  if (findUrl) {
    let timesClicked = findUrl.timesClicked;
    timesClicked++;
    await findUrl.updateOne({ timesClicked: timesClicked });
    res.redirect(findUrl.longUrl);
  }
  if (!findUrl) {
    res.send({
      status: 400,
      message: `Could not find ${shorturl} in database.`,
    });
  }

  return findUrl;
});

module.exports = router;
