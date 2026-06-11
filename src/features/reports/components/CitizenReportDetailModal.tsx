import React from "react";
import type { Report } from "../types";
import Badge from "../../../components/ui/Badge";
import {
  MdClose,
  MdLocationOn,
  MdPerson,
  MdCalendarToday,
  MdChat,
} from "react-icons/md";
import { getStatusVariant, getStatusLabel } from "../utils/statusHelpers";

interface CitizenReportDetailModalProps {
  report: Report;
  onClose: () => void;
  onOpenChat: () => void;
}

export const CitizenReportDetailModal: React.FC<
  CitizenReportDetailModalProps
> = ({ report, onClose, onOpenChat }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-white w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-slate-500 hover:text-slate-800"
        >
          <MdClose size={24} />
        </button>

        <div className="overflow-y-auto custom-scrollbar p-5 md:p-8">
          <div className="flex justify-between items-start mb-6 pr-10">
            <Badge variant={getStatusVariant(report.status.type_status)}>
              {getStatusLabel(report.status.type_status)}
            </Badge>
            <span className="text-[10px] md:text-xs font-mono text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-md">
              #{report.tracking_num}
            </span>
          </div>

          <div className="rounded-xl md:rounded-2xl overflow-hidden mb-6 aspect-video bg-slate-200 shadow-inner flex items-center justify-center">
            {report.img_url ? (
              <img
                src={report.img_url}
                alt="Evidencias"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400/80">
                <span className="material-symbols-outlined text-5xl">
                  image_not_supported
                </span>
                <span className="text-xs font-medium uppercase tracking-widest">
                  Sin evidencia fotográfica
                </span>
              </div>
            )}
          </div>

          <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4">
            {report.type.type}
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
            {report.description}
          </p>

          <div className="space-y-3 pt-6 border-t border-slate-200 mb-6">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MdLocationOn size={18} />
              </div>
              <span className="font-medium truncate">
                {report.street} {report.street_number}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MdPerson size={18} />
              </div>
              <span className="font-medium truncate">
                {report.user?.name || "Anónimo"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MdCalendarToday size={16} />
              </div>
              <span className="font-medium">
                {new Date(report.date).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button
              onClick={onOpenChat}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-primary hover:bg-primary/90 text-on-primary font-semibold rounded-2xl transition-colors shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <MdChat size={20} />
              Ir al Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
