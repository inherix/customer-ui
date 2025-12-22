import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) {
    return <div style={{ textAlign: "center", paddingTop: "20px" }}></div>;
  }

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
}
