import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import type { Comment, JSendResponse } from "../types";

export const useAddComment = (reportId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      const response = await api.post<JSendResponse<Comment>>(
        `/reports/${reportId}/comments`,
        { text },
      );
      return response.data.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myReports"] });
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
    },
  });
};
