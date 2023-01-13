const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
   process.env.MONGO_URL
).then(() => {
    console.log("Db connection established");
}).catch(err => {
    console.log(err);
});


app.listen(3000);


app.use("/", (req, res) => {
    res.send("samet")
})