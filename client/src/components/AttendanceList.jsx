// /client/components/AttendanceList.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const AttendanceList = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Fetch attendance records from the backend
  const fetchAttendanceRecords = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attendance');
      const data = await response.json();
      setAttendanceRecords(data.attendance);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  return (
    <div className="attendance-list">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{record.name}</td>
              <td className="border px-4 py-2">
                {new Date(record.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
