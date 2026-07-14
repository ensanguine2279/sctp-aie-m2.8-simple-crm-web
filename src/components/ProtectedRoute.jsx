// src/components/ProtectedRoute.jsx
import { useAuth } from "../contexts/AuthContextInstance";

import { Navigate, Outlet, useLocation } from "react-router";

function ProtectedRoute({ requiredRole }) {
  const { user, hasRole } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login. Pass the current location so LoginPage can send the user back.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="status-message error">
        You do not have permission to view this page.
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
