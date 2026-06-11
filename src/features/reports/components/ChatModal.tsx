import React from "react";
import type { Report } from "../types";
import { ReportChat } from "./ReportChat";
import Badge from "../../../components/ui/Badge";
import { getStatusVariant, getStatusLabel } from "../utils/statusHelpers";
import { MdClose, MdArrowBack } from "react-icons/md";

interface ChatModalProps {
  report: Report;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  report,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="
          fixed inset-0
          md:relative md:w-full md:max-w-2xl md:max-h-[90vh] md:rounded-[2rem] md:shadow-2xl
          bg-surface text-on-surface
          flex flex-col
          animate-in fade-in zoom-in
          overflow-hidden
        "
      >
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/20 bg-surface-container-low">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-full hover:bg-on-surface/8 transition-colors text-on-surface-variant hover:text-primary group"
              aria-label="Volver"
            >
              <MdArrowBack
                size={22}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>

            <div>
              <h3 className="font-semibold text-on-surface leading-tight">
                {report.type.type}
              </h3>
              <p className="text-xs text-on-surface-variant">
                #{report.tracking_num}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={getStatusVariant(report.status.type_status)}>
              {getStatusLabel(report.status.type_status)}
            </Badge>

            <button
              onClick={onClose}
              className="hidden md:flex p-1.5 rounded-full hover:bg-on-surface/8 transition-colors text-on-surface-variant"
              aria-label="Cerrar"
            >
              <MdClose size={22} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <ReportChat
            comments={report.comments || []}
            reportId={report.id_report}
          />
        </div>
      </div>
    </div>
  );
};
