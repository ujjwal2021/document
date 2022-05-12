const mongoose = require("mongoose");

const conntectDB = (url) =>  {
    mongoose.connect(url);
    console.log("database connected");
}

module.exports = conntectDB;