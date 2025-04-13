import { Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig"; // Import Firebase Auth instance

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; // Get the currently logged-in user

  if (!user) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the children (protected content)
  return children;
};

export default ProtectedRoute;
