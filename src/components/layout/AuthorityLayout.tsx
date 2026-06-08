import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import Sidebar from "./Sidebar";

const AuthorityLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-surface antialiased font-body">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-surface/80 backdrop-blur-xl sticky top-0 z-30 border-b border-outline-variant/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-on-surface-variant"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
            <div>
              <h1 className="text-base font-headline font-semibold text-on-surface leading-tight">
                Autoridad
              </h1>
              <p className="text-[10px] text-on-surface-variant tracking-wide">
                denuncia-ciudadana.
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col w-full px-6 md:px-8 py-8 md:py-10 max-w-5xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthorityLayout;
