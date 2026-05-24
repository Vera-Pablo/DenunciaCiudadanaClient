import React from "react";
import type { Report } from "../types";

interface ReportCardProps {
  report: Report;
  onClick?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pendiente":
      return "bg-amber-50 text-amber-700";
    case "confirmada":
    case "resuelta":
      return "bg-emerald-50 text-emerald-700";
    case "en revisión":
      return "bg-blue-50 text-blue-700";
    case "rechazada":
      return "bg-rose-50 text-rose-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const ReportCard: React.FC<ReportCardProps> = ({ report, onClick }) => {
  const statusColor = getStatusColor(report.status.type_status);

  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${statusColor}`}
          >
            {report.status.type_status}
          </span>
          <h3 className="text-lg font-semibold text-slate-800 leading-tight">
            {report.type.type} en {report.street}{" "}
            {report.street_number ? report.street_number : ""}
          </h3>
        </div>
        <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg tracking-wide">
          #{report.tracking_num}
        </span>
      </div>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50">
        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          <span className="material-symbols-outlined text-[16px]">
            calendar_today
          </span>
          <span className="capitalize">{formatDate(report.date)}</span>
        </div>
        <button 
          onClick={onClick}
          className="text-slate-600 font-medium text-sm hover:text-slate-900 flex items-center gap-1"
        >
          Ver detalles{" "}
          <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};
