const mongoose = require("mongoose");

const ResetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  AccesToken: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
});

const Reset = mongoose.model("Reset", ResetSchema);

module.exports = Reset;
