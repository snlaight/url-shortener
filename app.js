require("./dbConfig/db")
const express = require('express');

const app = express();
const port = process.env.PORT || 3000 ;
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

app.use('/', appRoutes);
app.use('/shorturl', urlRoutes);

app.listen(port, ()=> console.log(`Server started on port ${port}`));