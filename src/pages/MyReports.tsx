import React from "react";
import { Link } from "react-router-dom";
import { useMyReports } from "../features/reports/hooks/useMyReports";
import { ReportCard } from "../features/reports/components/ReportCard";
import { CitizenReportDetailModal } from "../features/reports/components/CitizenReportDetailModal";
import { ChatModal } from "../features/reports/components/ChatModal";
import { useAuth } from "../features/auth";
import type { Report } from "../features/reports/types";

const MyReports: React.FC = () => {
  const { user } = useAuth();
  const { data: reports, isLoading, isError } = useMyReports();
  const [selectedReport, setSelectedReport] = React.useState<Report | null>(null);
  const [chatReportId, setChatReportId] = React.useState<number | null>(null);
  const chatReport = chatReportId
    ? reports?.find((r) => r.id_report === chatReportId) ?? null
    : null;

  const handleOpenChat = (report: Report) => {
    setSelectedReport(null);
    setChatReportId(report.id_report);
  };

  if (isLoading) {
    return (
      <main className="w-full px-6 pt-8 pb-24 max-w-5xl mx-auto flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="w-full px-6 pt-8 pb-24 max-w-5xl mx-auto flex flex-col items-center justify-center text-center mt-20">
        <span className="material-symbols-outlined text-red-500 text-5xl mb-4">
          error
        </span>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Error al cargar tus denuncias
        </h2>
        <p className="text-slate-500">
          Por favor, intenta nuevamente más tarde.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full px-6 pt-8 pb-24 max-w-5xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 group"
      >
        <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform tracking-tight">
          arrow_back
        </span>
        <span className="font-headline font-medium">Volver</span>
      </Link>
      <div className="mb-10">
        <h2 className="text-[2.75rem] font-bold leading-tight text-slate-900 tracking-tight mb-2">
          Mis Denuncias
        </h2>
        <p className="text-slate-500 font-medium">
          Historial de reportes y estado de gestión.
        </p>
      </div>

      {!reports || reports.length === 0 ? (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-5">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              description
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Aún no tienes denuncias
          </h3>
          <p className="text-slate-500 mb-6 max-w-sm">
            Si encuentras algún inconveniente en la vía pública, puedes generar
            un nuevo reporte fácilmente.
          </p>
          <Link
            to="/reports/new"
            className="bg-primary hover:bg-primary/90 text-on-primary font-medium py-2.5 px-6 rounded-full transition-colors inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Crear Nueva Denuncia
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reports.map((report) => (
            <ReportCard 
              key={report.id_report} 
              report={report} 
              onClick={() => setSelectedReport(report)}
            />
          ))}
        </div>
      )}

      {selectedReport && (
        <CitizenReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onOpenChat={() => handleOpenChat(selectedReport)}
        />
      )}

      {chatReport && user && (
        <ChatModal
          report={chatReport}
          onClose={() => setChatReportId(null)}
        />
      )}
    </main>
  );
};

export default MyReports;
