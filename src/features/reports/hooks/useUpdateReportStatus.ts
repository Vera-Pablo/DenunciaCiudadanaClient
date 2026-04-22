import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import type { UpdateReportStatusData, JSendResponse } from "../types";

export const useUpdateReportStatus = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateReportStatusData) => {
      const response = await api.patch<JSendResponse<any>>(
        `/reports/${id}/status`,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
    },
  });
};
