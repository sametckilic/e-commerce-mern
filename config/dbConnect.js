const mongoose = require('mongoose');

function connection(){
mongoose.set("strictQuery", false);

mongoose.connect(
   process.env.MONGO_URL
).then(() => {
    console.log("Db connection established");
}).catch(err => {
    console.log(err);
});
}
module.exports = connection;