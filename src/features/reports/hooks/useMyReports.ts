import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";
import type { Report, JSendResponse } from "../types";

export const useMyReports = () => {
  return useQuery({
    queryKey: ["myReports"],
    queryFn: async (): Promise<Report[]> => {
      const response = await api.get<JSendResponse<Report[]>>("/reports/me");
      return response.data.data;
    },
  });
};
