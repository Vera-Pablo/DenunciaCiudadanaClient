import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";
import type { JSendResponse } from "../types";

export interface StatsResponse {
  total: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async (): Promise<StatsResponse> => {
      const response = await api.get<JSendResponse<StatsResponse>>(
        "/reports/stats",
      );
      return response.data.data;
    },
  });
};
