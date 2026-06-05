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

export const CitizenReportDetailModal: React.FC<CitizenReportDetailModalProps> = ({
  report,
  onClose,
  onOpenChat,
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-white w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row transition-all animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 z-[110] p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-slate-500 hover:text-slate-800"
        >
          <MdClose size={24} />
        </button>

        <div className="flex flex-col md:flex-row w-full overflow-y-auto md:overflow-hidden">
          <div className="w-full md:w-1/2 bg-slate-50 p-5 md:p-8 md:overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-slate-100">
            <div className="flex justify-between items-start mb-6 pr-10 md:pr-0">
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

            <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              {report.description}
            </p>

            <div className="space-y-3 pt-6 border-t border-slate-200">
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
          </div>

          <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col bg-white overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">forum</span>
                Respuestas Oficiales
              </h3>
              <button
                onClick={onClose}
                className="hidden md:flex p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              {(() => {
                const officialResponses = (report.comments || []).filter(c =>
                  c.text.includes("[RESPUESTA OFICIAL]")
                );

                if (officialResponses.length === 0) {
                  return (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 mt-10">
                      <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl">chat_bubble_outline</span>
                      </div>
                      <p className="text-slate-500 font-medium">
                        Aún no hay respuestas oficiales para esta denuncia.
                      </p>
                      <p className="text-sm text-slate-400 mt-2">
                        Las autoridades dejarán un mensaje aquí cuando se actualice el estado.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-6">
                    {officialResponses.map((comment) => {
                      const cleanText = comment.text.replace("[RESPUESTA OFICIAL]", "").trim();
                      const authorName = comment.user?.name || "Autoridad";

                      return (
                        <div
                          key={comment.id_comment}
                          className="p-4 rounded-2xl border bg-primary/5 border-primary/20"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-primary/10 text-primary">
                                {authorName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-800">{authorName}</p>
                                <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                                  {comment.user?.role?.type_role || "Autoridad"}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                              {new Date(comment.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {cleanText}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            <div className="pt-6 mt-auto border-t border-slate-100">
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
    </div>
  );
};
