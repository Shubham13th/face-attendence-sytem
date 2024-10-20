// /client/src/hooks/useAuth.js
import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);  // Mock authentication status
  const [isAdmin, setIsAdmin] = useState(true);  // Mock admin status

  return { isAuthenticated, isAdmin };
};
