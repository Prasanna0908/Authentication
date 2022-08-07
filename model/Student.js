// User Schema
// Change the schema and file name if you want to

const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: Number,
  },
  date_of_birth: {
    type: Date,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
