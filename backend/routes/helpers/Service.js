const urlModel = require("../../models/url.model");
const userModel = require("../../models/user.model");

module.exports = {
  async checkForExistingUrl(req, res) {
    let originalUrl = req.body.url;
    try {
      let checkForUrl = await urlModel
        .findOne({ longUrl: originalUrl })
        .then((foundUrl) => {
          return foundUrl;
        });
      if (checkForUrl) {
        res.send({
          status: 409,
          message: `Url already exists in DB as ${checkForUrl.shortUrl}`,
          shortUrl: `${checkForUrl.shortUrl}`,
          redirectUrl: `http://localhost:3050/SUA/${checkForUrl.shortUrl}`,
          longUrl: `${checkForUrl.originalUrl}`,
        });
      } else {
        createUrl(originalUrl)
      }
    } catch (e) {
      res.send({ status: 400, message: e });
    }
  },

  async createUrl(originalUrl, res) {
    let shortUrl = Math.random().toString(36).substring(9, 15);
    try {
      await urlModel
        .create({ longUrl: originalUrl, shortUrl, timesClicked: 0 })
        .then(
          res.send({
            status: 200,
            message: `URL succesfully created and stored as ${shortUrl} `,
            shortUrl: `${shortUrl}`,
            redirectUrl: `http://localhost:3050/SUA/${shortUrl}`,
            longUrl: `${originalUrl}`,
          })
        );
    } catch (e) {
      res.send({ status: 400, message: e });
    }
  },

  async updateUser(email, createdUrl, shortUrl, originalUrl, res) {
    try {
      await userModel
        .findOneandUpdate(email, { $push: { createdUrls: createdUrl._id } })
        .then((updatedUser) =>
          res.send({
            status: 200,
            message: `User with email ${email} succesfully updated.`,
          })
        );
    } catch (e) {
      res.send({ status: 400, message: e });
    }
  },

  async checkforExistingEmail(req, res) {
    let email = req.body.email;
    try {
      let userCheck = await userModel.findOne({ email: email });
      if (userCheck) {
        res.send({
          error: true,
          status: 409,
          message: `User with ${email} already exists. Please provide another email`,
        });
      } else {
        createUser(email).then((res) =>
          res.send({
            status: 200,
            message: `New user with email ${email} succesfully created.`,
          })
        );
      }
    } catch (e) {
      res.send({ status: 400, message: e });
    }
  },

  async createUser(email, res) {
    try {
      await userModel.create({ email }).then((newUser) =>
        res.send({
          status: 200,
          message: `New user with email ${email} succesfully created.`,
        })
      );
    } catch (e) {
      res.send({ status: 400, message: e });
    }
  },
};
