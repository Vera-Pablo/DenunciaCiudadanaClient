import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import SimpleLayout from "./components/layout/SimpleLayout";
import AuthorityLayout from "./components/layout/AuthorityLayout";
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
import Profile from "./pages/Profile";
import DashboardView from "./pages/DashboardView";

const PlaceholderView: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center text-center py-20">
    <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">
      construction
    </span>
    <h2 className="text-xl font-headline font-semibold text-on-surface mb-2">{title}</h2>
    <p className="text-sm text-on-surface-variant">Próximamente disponible.</p>
  </div>
);

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
              <Route path="reports" element={<Navigate to="/" replace />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          <Route element={<AuthorityLayout />}>
            <Route element={<ProtectedRoute requiredRole="Autoridad" />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<DashboardView />} />
              <Route path="/admin/contacts" element={<PlaceholderView title="Contactos" />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
