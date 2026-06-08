export interface User {
  id_user: number;
  dni: number;
  email: string;
  name: string;
  telefono: string;
  is_active: boolean;
  id_role: number;
  role: {
    id_role: number;
    type_role: "Ciudadano" | "Autoridad";
  };
}

export interface UpdateProfileData {
  name?: string;
  telefono?: string;
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
