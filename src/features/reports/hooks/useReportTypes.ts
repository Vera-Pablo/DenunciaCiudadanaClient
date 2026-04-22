import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";
import type { ReportType, JSendResponse } from "../types";

export const useReportTypes = () => {
  return useQuery({
    queryKey: ["reportTypes"],
    queryFn: async (): Promise<ReportType[]> => {
      const response = await api.get<JSendResponse<ReportType[]>>("/types");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour (types change rarely)
  });
};
