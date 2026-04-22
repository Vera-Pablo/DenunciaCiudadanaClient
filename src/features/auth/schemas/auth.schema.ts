import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Por favor, ingrese un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    dni: z
      .string()
      .min(7, "El DNI debe tener al menos 7 números")
      .regex(/^\d+$/, "El DNI debe contener solo números"),
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.email("Por favor, ingrese un correo válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La confirmación es requerida"),
    telefono: z
      .string()
      .min(7, "El teléfono debe tener al menos 7 caracteres")
      .max(15, "El teléfono es demasiado largo"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
