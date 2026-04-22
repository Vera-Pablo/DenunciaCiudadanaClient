export interface User {
  id_user: number;
  email: string;
  name: string;
  id_role: number;
  role: {
    id_role: number;
    type_role: "Ciudadano" | "Autoridad";
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface JSendResponse<T> {
  status: string;
  data: T;
  message?: string;
}
