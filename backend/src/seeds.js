require("dotenv").config();
require("./dbConfig/db");

//SEEDS TO SEED YOUR MONGODB DB TO GET STARTED WITH APP.

const mongoose = require("mongoose");

const urlModel = require("./models/urlModel");
const userModel = require("./models/userModel");

let users = [
  {
    email: "test@email.com",
    createdUrls: ["61ae25c81530b16fe8ff5ea3"],
    _id: "61ae2435ca9fa92d3f838265",
  },
  {
    email: "test2@email.com",
    createdUrls: ["61ae25c81530b16fe8ff5ea3"],
    _id: "61ae2466ca9fa92d3f838266",
  },
];

let urls = [
  {
    longUrl: "https://santilaight.io",
    shortUrl: "slio",
    createdBy: ["61ae2466ca9fa92d3f838266"],
    _id: '61ae2510f26aeac2131bc3ac',
    timesClicked: 0
  },
  {
    longUrl: "https://www.ole.com.ar",
    shortUrl: "ole",
    createdBy: ["61ae2466ca9fa92d3f838265"],
    _id: '61ae25c81530b16fe8ff5ea3',
    timesClicked : 0
  },
];

let seedUsers = async () => {
  await userModel
    .deleteMany()
    .then(() => {
      return userModel.create(users);
    })
    .then((createdSeeds) => {
      console.log(
        `${createdSeeds.length} users created with the following names:`
      );
      console
        .log(createdSeeds.map((seed) => seed.email))
    })
    .then(() => {
        mongoose.disconnect();
      })
      .catch((e) => {
        mongoose.disconnect();
        console.log(`we have the following error: ${e}`);
      });
};

let seedUrls = async () => {
  await urlModel
    .deleteMany()
    .then(() => {
      return urlModel.create(urls);
    })
    .then((createdUrls) => {
      console.log(
        `${createdUrls.length} urls created with the following urls:`
      );
      console.log(createdUrls.map((url) => url.longUrl));
    })
};

seedUsers();
seedUrls();
