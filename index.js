const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

dotenv.config();

let server = app.listen(process.env.PORT || 3000,() =>{
    console.log("App listening on " + server.address().port);
});


mongoose.set("strictQuery", false);

mongoose.connect(
   process.env.MONGO_URL
).then(() => {
    console.log("Db connection established");
}).catch(err => {
    console.log(err);
});

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);