// /server/models/Attendance.js

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
