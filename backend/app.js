require("./dbConfig/db")
const express = require('express');

const app = express();
const port = process.env.PORT || 3050 ;
const urlRoutes = require('./routes/dbRequest')
const appRoutes = require('./routes/appRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((error, req, res, next) => {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  });

//THESE ROUTES DISPLAY WHAT'S CURRENTLY IN THE DB AS WELL AS HANDLE THE REDIRECT TO THE ORIGINAL URL
app.use('/', appRoutes);

//THESE ROUTES ALL GO TO THE DB
app.use('/shorturl', urlRoutes);

app.listen(port, ()=> console.log(`Server started on port ${port}`));