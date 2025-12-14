import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div style={{ textAlign: "center", paddingTop: "20px" }}></div>;
  }

  if (!user) return <Navigate to="/signin" replace />;

  return children;
}
