import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";
import type { Status, JSendResponse } from "../types";

export const useStatuses = () => {
  return useQuery({
    queryKey: ["statuses"],
    queryFn: async (): Promise<Status[]> => {
      const response = await api.get<JSendResponse<Status[]>>("/statuses");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 60,
  });
};
