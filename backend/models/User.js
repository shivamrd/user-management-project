const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  rollno: String,
  firstName: String,
  lastName: String,
  countrycode: String,
  aadharCardNo: String,
  mobileNo: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);
