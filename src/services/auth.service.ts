import api from "../api/axios";

export interface User {
  id_user: number;
  email: string;
  name: string;
  id_role: number;
  role: {
    id_role: number;
    type_role: "citizen" | "authority";
  };
}

interface JSendResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

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
