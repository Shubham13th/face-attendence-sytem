const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/attendanceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log('Error connecting to MongoDB:', err));


app.use(cors());
app.use(express.json());

let attendance = [];

// POST request to record attendance
app.post('/api/attendance', (req, res) => {
  const { name } = req.body;
  const timestamp = new Date().toISOString();

  attendance.push({ name, time: timestamp });
  console.log(`Attendance recorded: ${name} at ${timestamp}`);
  res.status(200).json({ message: 'Attendance recorded successfully', name, time: timestamp });
});

// Server listens on port 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
