// /client/src/components/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl mt-4">Page Not Found</p>
        <Link to="/" className="text-indigo-600 mt-4">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
