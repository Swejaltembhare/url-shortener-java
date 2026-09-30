import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Helper to check if token exists and is not expired
  const isTokenValid = (jwt) => {
    if (!jwt) return false;
    try {
      const payload = JSON.parse(atob(jwt.split(".")[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return false;
      }
      return true;
    } catch {
      return true;
    }
  };

  if (!isTokenValid(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;