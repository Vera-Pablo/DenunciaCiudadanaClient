import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard, MdAssignment, MdContactPhone, MdLogout } from "react-icons/md";
import { useAuth } from "../../features/auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: MdDashboard },
  { path: "/admin", label: "Gestión", icon: MdAssignment, exact: true },
  { path: "/admin/contacts", label: "Contactos", icon: MdContactPhone },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-surface border-r border-outline-variant/20
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="px-6 pt-8 pb-6 border-b border-outline-variant/10">
          <h2 className="text-xl font-headline font-semibold text-on-surface">Autoridad</h2>
          <p className="text-xs text-on-surface-variant font-medium tracking-wide mt-0.5">
            denuncia-ciudadana.
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-outline-variant/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-error transition-colors"
          >
            <MdLogout size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
