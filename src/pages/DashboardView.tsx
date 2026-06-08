import React from "react";
import { MdDashboard } from "react-icons/md";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { useDashboardStats } from "../features/reports/hooks/useDashboardStats";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

const STATUS_COLORS: Record<string, string> = {
  Pendiente: "#f59e0b",
  Rechazado: "#ef4444",
  Atendido: "#3b82f6",
  Finalizado: "#22c55e",
};

const TYPE_BAR_COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#06b6d4",
  "#8b5cf6",
  "#14b8a6",
  "#eab308",
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

  const pieData = statusEntries.map(([name, value]) => ({
    id: name,
    label: name,
    value,
    color: STATUS_COLORS[name] ?? "#94a3b8",
  }));

  const barData = typeEntries.map(([name, count]) => ({ name, count }));

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

      <div className="bg-surface border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-on-surface-variant font-medium">
          Total de denuncias
        </p>
        <p className="text-5xl font-headline font-bold text-on-surface mt-2">
          {stats?.total ?? 0}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-headline font-semibold text-on-surface mb-4">
            Por estado
          </h2>
          <div className="h-[300px]">
            <ResponsivePie
              data={pieData}
              margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
              innerRadius={0.5}
              padAngle={2}
              cornerRadius={6}
              activeOuterRadiusOffset={8}
              colors={{ datum: "data.color" }}
              borderWidth={1}
              borderColor={{ theme: "background" }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#64748b"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor="#ffffff"
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateY: 40,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#64748b",
                  symbolSize: 14,
                  symbolShape: "circle",
                },
              ]}
            />
          </div>
        </div>

        <div className="bg-surface border border-outline-variant/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-headline font-semibold text-on-surface mb-4">
            Por tipo
          </h2>
          <div className="h-[300px]">
            <ResponsiveBar
              data={barData}
              keys={["count"]}
              indexBy="name"
              layout="horizontal"
              margin={{ top: 0, right: 40, bottom: 0, left: 110 }}
              padding={0.35}
              enableGridX={false}
              enableGridY={false}
              borderRadius={12}
              borderWidth={0}
              colors={({ index }) => TYPE_BAR_COLORS[index % TYPE_BAR_COLORS.length]}
              label={(d) => d.value ?? ""}
              labelTextColor="#ffffff"
              labelSkipWidth={0}
              valueScale={{ type: "linear" }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 12,
              }}
              axisBottom={null}
              tooltip={({ indexValue, value }) => (
                <div className="bg-surface text-on-surface px-3 py-2 rounded-xl border border-outline-variant/10 text-sm shadow-lg">
                  {indexValue}: <strong>{value}</strong>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
