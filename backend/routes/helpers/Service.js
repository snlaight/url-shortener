const urlModel = require("../../models/urlModel");
const userModel = require("../../models/userModel");

module.exports = {
  async checkForExistingUrl(originalUrl, res) {
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
        });
      }
    } catch (e) {
      res.send({ status: 400, message: e });
    }
  },

  async createUrl(originalUrl, shortUrl, res) {
    try {
      await urlModel
        .create({ longUrl: originalUrl, shortUrl, timesClicked: 0 })
        .then((urlCreated) => {
          return urlCreated;
        });
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

  async checkforExistingEmail(email, res) {
    try {
      let userCheck = await userModel.findOne({ email }).then((userFound) => {
        return userFound;
      });
      if (userCheck) {
        res.send({
          status: 409,
          message: `User with ${email} already exists. Please provide another email`,
        });
      }
      createUser(email).then((res) =>
        res.send({
          status: 200,
          message: `New user with email ${email} succesfully created.`,
        })
      );
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
