import React from "react";
import { MdDashboard } from "react-icons/md";
import { useDashboardStats } from "../features/reports/hooks/useDashboardStats";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

const statusColors: Record<string, string> = {
  Pendiente: "bg-amber-50 text-amber-700 border-amber-200",
  Rechazado: "bg-red-50 text-red-700 border-red-200",
  Atendido: "bg-blue-50 text-blue-700 border-blue-200",
  Finalizado: "bg-green-50 text-green-700 border-green-200",
};

const typeBarColors: string[] = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
];

const DashboardView: React.FC = () => {
  const { data: stats, isLoading, isError, refetch } = useDashboardStats();

  if (isLoading) return <LoadingSpinner size="lg" />;

  if (isError) {
    return (
      <ErrorMessage
        title="Error al cargar estadísticas"
        message="No se pudieron obtener las métricas del sistema. Verifica tu conexión e intenta de nuevo."
        onRetry={() => refetch()}
      />
    );
  }

  const statusEntries = Object.entries(stats?.byStatus ?? {}).sort(
    ([, a], [, b]) => b - a,
  );
  const typeEntries = Object.entries(stats?.byType ?? {}).sort(
    ([, a], [, b]) => b - a,
  );
  const maxTypeCount = typeEntries.length > 0 ? typeEntries[0][1] : 1;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <MdDashboard size={22} />
        </div>
        <h1 className="text-2xl md:text-3xl font-headline font-semibold text-on-surface">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/10 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-on-surface-variant font-medium">Total</p>
          <p className="text-3xl font-headline font-semibold text-on-surface mt-2">
            {stats?.total ?? 0}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            denuncias registradas
          </p>
        </div>

        {statusEntries.map(([status, count]) => (
          <div
            key={status}
            className={`border rounded-2xl p-5 shadow-sm ${statusColors[status] ?? "bg-surface border-outline-variant/10"}`}
          >
            <p className="text-sm font-medium opacity-80">{status}</p>
            <p className="text-3xl font-headline font-semibold mt-2">
              {count}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-headline font-semibold text-on-surface mb-6">
          Por tipo de denuncia
        </h2>

        {typeEntries.length === 0 ? (
          <p className="text-sm text-on-surface-variant">
            No hay datos disponibles.
          </p>
        ) : (
          <div className="space-y-4">
            {typeEntries.map(([type, count], index) => (
              <div key={type} className="flex items-center gap-3">
                <span className="text-sm font-medium text-on-surface w-36 shrink-0 truncate">
                  {type}
                </span>
                <div className="flex-1 bg-surface-container-low rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${typeBarColors[index % typeBarColors.length]}`}
                    style={{
                      width: `${Math.max((count / maxTypeCount) * 100, 8)}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-on-surface-variant w-8 text-right tabular-nums">
                  {count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView;
