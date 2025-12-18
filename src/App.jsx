import { lazy, Suspense } from "react";
import "./App.css";
import AuthLayout from "./pages/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./pages/MainLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Reset from "./pages/Reset";
import { useAuth } from "./auth/AuthContext";
import Dashboard from "./pages/Dashboard";
function App() {
  const BeneficiaryRoutes = lazy(() => import("beneficiary/Routes"));
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/beneficiary/*" element={<BeneficiaryRoutes />} />
          </Route>
        </Route>
        <Route
          path="/signin"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <AuthLayout>
                <Login onSuccess={() => navigate("/dashboard")} />
              </AuthLayout>
            )
          }
        />

        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route
          path="/reset"
          element={
            <AuthLayout>
              <Reset />
            </AuthLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
