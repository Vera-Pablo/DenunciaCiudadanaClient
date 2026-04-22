import React from "react";
import { Outlet } from "react-router-dom";

const SimpleLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface antialiased font-body flex flex-col px-6 py-12 overflow-y-auto">
      <div className="flex-grow flex flex-col justify-center w-full max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SimpleLayout;
