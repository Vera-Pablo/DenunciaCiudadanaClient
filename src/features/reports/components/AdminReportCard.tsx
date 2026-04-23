import React from "react";
import type { Report } from "../types";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { getStatusVariant, getStatusLabel } from "../utils/statusHelpers";

interface AdminReportCardProps {
  report: Report;
  onSelect: (report: Report) => void;
}

const AdminReportCard: React.FC<AdminReportCardProps> = ({ report, onSelect }) => {
  return (
    <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 flex flex-col gap-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-bold text-primary tracking-wider">
            #{report.tracking_num}
          </span>
          <span className="text-xs text-on-surface-variant">
            {new Date(report.date).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <Badge variant={getStatusVariant(report.status.type_status)}>
          {getStatusLabel(report.status.type_status)}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-surface-container-highest rounded-lg flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">category</span>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-medium">
              Tipo de denuncia
            </p>
            <p className="text-sm font-medium text-on-surface">
              {report.type.type}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-surface-container-highest rounded-lg flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">person</span>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-medium">
              Reportado por
            </p>
            <p className="text-sm font-medium text-on-surface">
              {report.user?.name || "Anónimo"}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button
          onClick={() => onSelect(report)}
          variant="secondary"
          className="w-full justify-center !rounded-2xl"
          icon
        >
          Gestionar Reporte
        </Button>
      </div>
    </div>
  );
};

export { AdminReportCard };
