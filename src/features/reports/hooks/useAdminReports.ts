import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";
import type { Report, JSendResponse } from "../types";

export interface AdminReportsFilters {
  id_status?: number;
  id_type?: number;
}

export const useAdminReports = (filters: AdminReportsFilters = {}) => {
  return useQuery({
    queryKey: ["adminReports", filters],
    queryFn: async (): Promise<Report[]> => {
      const { id_status, id_type } = filters;
      const params = new URLSearchParams();

      if (id_status && id_status > 0) {
        params.append("id_status", id_status.toString());
      }
      if (id_type && id_type > 0) {
        params.append("id_type", id_type.toString());
      }

      const response = await api.get<JSendResponse<Report[]>>(
        `/reports/admin?${params.toString()}`,
      );
      return response.data.data;
    },
  });
};
