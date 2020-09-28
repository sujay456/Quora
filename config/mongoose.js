const mongoose = require("mongoose");
const env = require("./environment");
mongoose.connect(`mongodb://localhost/${env.db}`, { useNewUrlParser: true }); //connecting to the mongoDB

const db = mongoose.connection; //aquiring the connection

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to mongoDB");
});

module.exports = db;
