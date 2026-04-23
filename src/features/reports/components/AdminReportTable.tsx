import React from "react";
import type { Report } from "../types";
import Badge from "../../../components/ui/Badge";
import { AdminReportCard } from "./AdminReportCard";
import { getStatusVariant, getStatusLabel } from "../utils/statusHelpers";

interface AdminReportTableProps {
  reports: Report[];
  onSelectReport: (report: Report) => void;
}

const AdminReportTable: React.FC<AdminReportTableProps> = ({
  reports,
  onSelectReport,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {reports.map((report) => (
          <AdminReportCard
            key={report.id_report}
            report={report}
            onSelect={onSelectReport}
          />
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto bg-surface-container-low rounded-[2rem] border border-outline-variant/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/10 text-xs font-label text-on-surface-variant uppercase tracking-widest">
              <th className="px-6 py-5 font-medium">Tracking</th>
              <th className="px-6 py-5 font-medium">Fecha</th>
              <th className="px-6 py-5 font-medium">Tipo</th>
              <th className="px-6 py-5 font-medium text-center">Ciudadano</th>
              <th className="px-6 py-5 font-medium text-center">Estado</th>
              <th className="px-6 py-5 font-medium text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {reports.map((report) => (
              <tr
                key={report.id_report}
                className="hover:bg-surface-container-highest/30 transition-colors group"
              >
                <td className="px-6 py-4">
                  <span className="font-mono text-sm font-medium text-primary">
                    #{report.tracking_num}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">
                  {new Date(report.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">
                  {report.type.type}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-sm font-medium text-on-surface">
                      {report.user?.name || "Anónimo"}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">
                      {report.user?.email || "-"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <Badge variant={getStatusVariant(report.status.type_status)}>
                    {getStatusLabel(report.status.type_status)}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onSelectReport(report)}
                    className="text-primary hover:bg-primary-container/30 px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                  >
                    Gestionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reports.length === 0 && (
        <div className="bg-surface-container-low rounded-[2rem] border border-outline-variant/10 px-6 py-20 text-center text-on-surface-variant italic">
          No se encontraron denuncias con los filtros aplicados.
        </div>
      )}
    </div>
  );
};

export { AdminReportTable };
