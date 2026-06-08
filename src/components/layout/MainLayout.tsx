import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { useAuth } from "../../features/auth";
import { FloatingChatButton } from "../../features/reports/components/FloatingChatButton";

const MainLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-surface antialiased font-body">
      <header className="bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 md:px-8 pt-8 md:pt-12 pb-4 md:pb-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-highest overflow-hidden shadow-sm flex-shrink-0">
              <img
                alt="Avatar de usuario"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzkpekY6wEp26XvFScpEKsaobJTaE7PAeunsoZA_Ewu59QLNhbsmHc8SPUGUYbek_WBCqwIK8f1T3d8MI3JNkcnedvXHu-0c8lcI9uZBFW-FheUAwGTDaphBb0QROmT89BagdiePGTJWHojACKX9db8Zl3HK3esCzAzEdAH50oAdf4vtF0h7QeZYbMIoXE6xNHNYDks19sejTpUX4aSm7-SL5gNfv2R4ui3MDaux733L1-JFLpv7_6X1RlBwq-Kj8BVVtvmXwRtBel"
              />
            </div>
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <h1 className="font-headline font-semibold tracking-tight text-xl md:text-2xl text-on-surface">
                Servicios Ciudadanos
              </h1>
            </Link>
          </div>

          {user && (
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors group"
            >
              <span className="hidden md:inline font-medium">{user.name}</span>
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <MdPerson size={20} />
              </div>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col w-full px-6 md:px-8 py-8 md:py-16 max-w-7xl mx-auto">
        <Outlet />
      </main>

      {user && <FloatingChatButton />}
    </div>
  );
};

export default MainLayout;
