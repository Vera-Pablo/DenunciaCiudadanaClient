import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import type { User, UpdateProfileData, JSendResponse } from "../types";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData): Promise<User> => {
      const response = await api.patch<JSendResponse<User>>("/users/me", data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
