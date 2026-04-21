import api from "../api/axios";

// Types based on Backend UserMapper and AuthService
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

export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Authentication service to interact with the Backend API.
 */
export const authService = {
  login: async (data: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: any): Promise<any> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
};
