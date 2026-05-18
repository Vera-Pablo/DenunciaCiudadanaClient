import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import SimpleLayout from "./components/layout/SimpleLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./features/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CreateReport from "./pages/CreateReport";
import AdminDashboard from "./pages/AdminDashboard";
import MyReports from "./pages/MyReports";
import { Toaster } from "sonner";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route element={<SimpleLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
          </Route>

          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports/new" element={<CreateReport />} />
              <Route path="/reports/me" element={<MyReports />} />

              <Route element={<ProtectedRoute requiredRole="Autoridad" />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              <Route path="reports" element={<Navigate to="/" replace />} />
              <Route path="profile" element={<Navigate to="/" replace />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
