const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const connection = require('./config/dbConnect');

dotenv.config();

connection();

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);


let server = app.listen(process.env.PORT || 3000,() =>{
    console.log("App listening on " + server.address().port);
});