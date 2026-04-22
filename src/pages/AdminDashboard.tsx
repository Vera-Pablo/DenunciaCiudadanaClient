import React, { useState } from "react";
import {
  useAdminReports,
  useReportTypes,
  useStatuses,
  AdminReportTable,
  ReportDetailModal,
  type Report,
} from "../features/reports";
import Select from "../components/ui/Select";
import { MdFilterList, MdDashboard } from "react-icons/md";

const AdminDashboard: React.FC = () => {
  const [filters, setFilters] = useState({ id_status: 0, id_type: 0 });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const { data: reports, isLoading } = useAdminReports(filters);
  const { data: types } = useReportTypes();
  const { data: statuses } = useStatuses();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: parseInt(value) }));
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 text-primary mb-2">
            <MdDashboard size={24} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Panel de Control
            </span>
          </div>
          <h2 className="text-[2.75rem] leading-[1.1] font-headline font-light tracking-tight text-on-surface">
            Gestión de Denuncias
          </h2>
          <p className="text-lg text-on-surface-variant mt-2 max-w-xl leading-relaxed">
            Supervisa, filtra y resuelve los reportes enviados por la comunidad
            de forma centralizada.
          </p>
        </div>
      </header>

      <section className="bg-surface-container-low p-6 rounded-[2.25rem] border border-outline-variant/10 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3 text-on-surface-variant">
            <MdFilterList size={24} />
            <span className="font-semibold text-sm uppercase tracking-wide">
              Filtrar por:
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Select
              options={[
                { value: 0, label: "Todos los Estados" },
                ...(statuses?.map((s) => ({
                  value: s.id_status,
                  label:
                    s.type_status === "Finalizado" ? "Resuelta" : s.type_status,
                })) || []),
              ]}
              value={filters.id_status}
              onChange={(e) => handleFilterChange("id_status", e.target.value)}
              className="!py-3 !px-5 !rounded-2xl"
            />

            <Select
              options={[
                { value: 0, label: "Todos los Tipos" },
                ...(types?.map((t) => ({ value: t.id_type, label: t.type })) ||
                  []),
              ]}
              value={filters.id_type}
              onChange={(e) => handleFilterChange("id_type", e.target.value)}
              className="!py-3 !px-5 !rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-on-surface-variant font-medium animate-pulse">
                Cargando denuncias...
              </p>
            </div>
          </div>
        ) : (
          <AdminReportTable
            reports={reports || []}
            onSelectReport={setSelectedReport}
          />
        )}
      </section>

      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
