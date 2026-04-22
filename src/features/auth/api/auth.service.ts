import api from "../../../api/axios";
import type { User, AuthResponse, JSendResponse } from "../types";

export const authService = {
  login: async (data: any): Promise<AuthResponse> => {
    const response = await api.post<JSendResponse<AuthResponse>>(
      "/auth/login",
      data,
    );
    return response.data.data;
  },

  register: async (data: any): Promise<User> => {
    const response = await api.post<JSendResponse<User>>(
      "/auth/register",
      data,
    );
    return response.data.data;
  },
};
