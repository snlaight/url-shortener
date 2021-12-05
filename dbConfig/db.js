require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j5oo4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((x) => {
    console.log(
      `Succesfully connected to MongoDB: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to Mongo : ", err);
  });
