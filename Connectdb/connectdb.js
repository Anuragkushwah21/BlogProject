const mongoose = require("mongoose");

const connectDb = () => {
    return mongoose
        .connect("mongodb://0.0.0.0:27017/Blog")

        .then(() => {
            console.log("connected sucessfully");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = connectDb;
