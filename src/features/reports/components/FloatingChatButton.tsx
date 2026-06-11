import React, { useState, useRef, useEffect } from "react";
import { MdChat, MdClose } from "react-icons/md";
import { useMyReports } from "../hooks/useMyReports";
import { useAdminReports } from "../hooks/useAdminReports";
import { useAuth } from "../../auth";
import { ChatModal } from "./ChatModal";
import type { Report } from "../types";

export const FloatingChatButton: React.FC = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatReportId, setChatReportId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAuthority = user?.role?.type_role === "Autoridad";

  const { data: citizenReports } = useMyReports();
  const { data: adminReports } = useAdminReports();
  const reports = isAuthority ? adminReports : citizenReports;

  const chatReport = chatReportId
    ? (reports?.find((r) => r.id_report === chatReportId) ?? null)
    : null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleSelectReport = (report: Report) => {
    setMenuOpen(false);
    setChatReportId(report.id_report);
  };

  if (!user) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
        {menuOpen && (
          <div
            ref={menuRef}
            className="w-80 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-[slideUp_0.2s_ease-out]"
          >
            <div className="px-4 py-3 border-b border-slate-100">
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {isAuthority ? "Denuncias" : "Mis Denuncias"}
              </span>
            </div>

            {reports && reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report.id_report}
                  onClick={() => handleSelectReport(report)}
                  className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                >
                  <p className="text-sm font-semibold text-slate-800">
                    {report.type.type}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    #{report.tracking_num}
                  </p>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-slate-400">
                No hay denuncias
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-on-primary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          {!menuOpen && (
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
          )}
          <span className="relative z-10 text-2xl">
            {menuOpen ? <MdClose /> : <MdChat />}
          </span>
        </button>
      </div>

      {chatReport && (
        <ChatModal
          report={chatReport}
          onClose={() => setChatReportId(null)}
        />
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};
