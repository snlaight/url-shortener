const urlModel = require("../../models/url.model");
const userModel = require("../../models/user.model");

export const checkForExistingUrl = async (req, res) => {
  let originalUrl = req.body.url;
  try {
    let checkForUrl = await urlModel.findOne({ longUrl: originalUrl });
    if (checkForUrl) {
      res.status(409).json({
          message: `Url already exists in DB as ${checkForUrl.shortUrl}`,
          shortUrl: `${checkForUrl.shortUrl}`,
          redirectUrl: `http://localhost:3050/SUA/${checkForUrl.shortUrl}`,
          longUrl: `${checkForUrl.longUrl}`,
        });
    } else {
      let shortUrl = Math.random().toString(36).substring(9, 15);
      const newUrl = new urlModel({
        longUrl: originalUrl,
        shortUrl,
        timesClicked: 0,
      })
      await newUrl.save();
      res.status(200).json({ 
        message: `URL succesfully created and stored as ${shortUrl} `,
        shortUrl: `${shortUrl}`,
        redirectUrl: `http://localhost:3050/SUA/${shortUrl}`,
        longUrl: `${originalUrl}`
      })
      return
    }
  } catch (e) {
    res.status(400).json({message: `We have the following error: ${e}` })
  }
};

export const updateUser = async (
  email,
  createdUrl,
  shortUrl,
  originalUrl,
  res
) => {
  try {
    await userModel
      .findOneandUpdate(email, { $push: { createdUrls: createdUrl._id } })
      .then((updatedUser) =>
      res.status(200).json({ message:`User with email ${email} succesfully updated.` })
      )
  } catch (e) {
    res.status(400).json({e})
  }
};

export const checkforExistingEmail = async (req, res) => {
  let email = req.body.email;
  try {
    let userCheck = await userModel.findOne({ email: email });
    if (userCheck) {
      res.status(409).json({message: `User with ${email} already exists. Please provide another email`,error: true})
    }
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(200).json({message: `User with email ${email} succesfully created.`})
    return;
  } catch (e) {
    res.status(400).json({message: `we have the following error: ${e}` })
  }
};

export const getAllUrls = async (req, res) => {
  try {
    let urls = await urlModel.find();
    res.status(200).json({urls})
  } catch (e) {
    res.status(500).json({message: `we have the following error : ${e}`})
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let users = await userModel.find()
    res.status(200).json({users})
  } catch (e) {
    res.status(500).json({message: `we have the following error : ${e}`})
  }
};
export const getShortUrlAndRedirect = async (req, res) => {
  const shorturl = req.params.shorturl;
  try {
    const findUrl = await urlModel.findOne({
      shortUrl: shorturl,
    });

    let timesClicked = findUrl.timesClicked++;
    if (findUrl) {
      await findUrl.updateOne({ timesClicked: timesClicked });
      res.redirect(findUrl.longUrl);
    } else {
      res.status(400).json({message: `Could not find ${shorturl} in database.`})
    }
  } catch (e) {
    res.status(500).json({message: `we have the following error : ${e}`})
  }
};
