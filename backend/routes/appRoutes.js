const express = require("express");
const router = express.Router();

const Services = require("./helpers/Service")

const users = Services.getAllUsers;
const urls = Services.getAllUrls;
const shortUrlRedirect = Services.getShortUrlAndRedirect;

//home route of the app to render data, still TBC
router.get("/", (req, res) => {
  res.send({ status: 200, message: "Reached home route of app!" });
});


//simple route to display all of the urls currently in the DB (for testing with Postman)
router.get("/urls", urls);

//simple route to display all of the users currently in the DB (for testing with postman)
router.get("/users", users);


//this route grabs the shortlURl via the params of the query and redirects to the long/original URL stored in the database.
router.get("/SUA/:shorturl", shortUrlRedirect);

module.exports = router;
