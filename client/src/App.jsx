// /client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FaceRecognition from "./components/FaceRecognition";
import AttendanceList from "./components/AttendanceList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FaceRecognition />} />
        <Route path="/attendance" element={<AttendanceList />} />
      </Routes>
    </Router>
  );
};

export default App;
