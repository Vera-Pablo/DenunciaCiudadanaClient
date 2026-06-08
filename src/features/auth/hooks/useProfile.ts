import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";
import type { User, JSendResponse } from "../types";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<User> => {
      const response = await api.get<JSendResponse<User>>("/users/me");
      return response.data.data;
    },
  });
};
