const express = require("express");
const router = express.Router();
const urlModel = require('../models/urlModel');
const userModel = require('../models/userModel');


router.get("/:shortUrl", async (req, res) => {
 
    const findUrl = await urlModel.findOne({
        shortUrl : req.params.shortUrl
    }).then(( url )=> res.redirect(url.longUrl)).catch((e)=> 
    res.send({message: `There's been an error in your request.`})
    , console.log(e));

    return findUrl

});
module.exports = router;