const urlModel = require("../../models/url.model");
const userModel = require("../../models/user.model");

module.exports = {
  async checkForExistingUrl(req, res) {
    let originalUrl = req.body.url;
    try {
      let checkForUrl = await urlModel.findOne({ longUrl: originalUrl });
      if (checkForUrl) {
        res.send({
          status: 409,
          message: `Url already exists in DB as ${checkForUrl.shortUrl}`,
          shortUrl: `${checkForUrl.shortUrl}`,
          redirectUrl: `http://localhost:3050/SUA/${checkForUrl.shortUrl}`,
          longUrl: `${checkForUrl.longUrl}`,
        });
      } else {
        let shortUrl = Math.random().toString(36).substring(9, 15);
        newUrl = new urlModel({
          longUrl: originalUrl,
          shortUrl,
          timesClicked: 0,
        });
        await newUrl.save();
        res.send({
          status: 200,
          message: `URL succesfully created and stored as ${shortUrl} `,
          shortUrl: `${shortUrl}`,
          redirectUrl: `http://localhost:3050/SUA/${shortUrl}`,
          longUrl: `${originalUrl}`,
        });
      }
    } catch (e) {
      res.send({ status: 400, message: `We have the following error: ${e}` });
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
      }
      newUser = new userModel(req.body);
      await newUser.save();
      res.send({
        status: 200,
        message: `User with email ${email} succesfully created.`,
      });
      return;
    } catch (e) {
      res.send({ status: 400, message: `we have the following error: ${e}` });
    }
  },

  async getAllUrls(req, res) {
    try {
      let urls = await urlMode.find().then((allUrls) => {
        return allUrls;
      });
      res.send(urls);
    } catch (e) {
      res.send({ status: 500, message: `we have the following error : ${e}` });
    }
  },

  async getAllUsers(req, res) {
    try {
      let users = await userModel.find().then((allUsers) => {
        return allUsers;
      });
      res.send(users);
    } catch (e) {
      res.send({ status: 500, message: `we have the following error : ${e}` });
    }
  },
  async getShortUrlAndRedirect(req, res) {
    const shorturl = req.params.shorturl;
    try {
      const findUrl = await urlModel.findOne({
        shortUrl: shorturl,
      });

      let timesClicked = findUrl.timesClicked++;
      if (findUrl) {
        timesClicked++;
        await findUrl.updateOne({ timesClicked: timesClicked });
        res.redirect(findUrl.longUrl);
      } else {
        res.send({
          status: 400,
          message: `Could not find ${shorturl} in database.`,
        });
      }
    } catch (e) {
      res.send({ status: 500, message: `we have the following error : ${e}` });
    }
  },
};
