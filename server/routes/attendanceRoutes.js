// /server/routes/attendanceRoutes.js

const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');  // Model for attendance

// POST route to record attendance
router.post('/attendance', async (req, res) => {
  const { name } = req.body;

  try {
    // Create a new attendance record
    const newAttendance = new Attendance({ name });
    await newAttendance.save();

    res.status(200).json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({ message: 'Server error, attendance not recorded' });
  }
});

// Add this to /server/routes/attendanceRoutes.js

// GET route to fetch all attendance records
router.get('/attendance', async (req, res) => {
  try {
    const attendance = await Attendance.find().sort({ timestamp: -1 }); // Sort by latest attendance
    res.status(200).json({ attendance });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Server error, could not fetch attendance records' });
  }
});


module.exports = router;
