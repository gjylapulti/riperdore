import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  console.log("Loading:", loading);
  console.log("IsAuthenticated:", isAuthenticated);
  console.log("User:", user);

  if (loading === false) {
    if (!isAuthenticated) {
      console.log("User is not authenticated. Redirecting to /login");
      return <Navigate to="/login" replace />;
    } else {
      console.log("User is authenticated.");
      if (!user) {
        console.log("User object is null. Redirecting to /login");
        return <Navigate to="/login" replace />;
      } else if (user.role !== "Admin") {
        console.log("User is not an admin. Redirecting to /");
        return <Navigate to="/" replace />;
      }
      console.log("User is authenticated as admin. Allowing access.");
      return children;
    }
  }

  console.log("Loading...");
  return null;
};

export default ProtectedAdminRoute;
