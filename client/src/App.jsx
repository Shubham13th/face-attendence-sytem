// /client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FaceRecognition from "./components/FaceRecognition";
import AttendanceList from "./components/AttendanceList";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import { useAuth } from "./hooks/useAuth";  // Custom hook for auth logic

const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();  // Custom hook to manage authentication state

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar always visible */}
        <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />

        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<FaceRecognition />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/attendance"
              element={
                isAuthenticated ? <AttendanceList /> : <Navigate to="/login" />
              }
            />

            {/* Admin Route Example */}
            <Route
              path="/admin"
              element={
                isAuthenticated && isAdmin ? <AdminPanel /> : <Navigate to="/" />
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
