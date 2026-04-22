import { z } from "zod";

export const createReportSchema = z.object({
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción es demasiado larga"),
  street: z
    .string()
    .min(1, "La calle es obligatoria")
    .max(100, "El nombre de la calle es demasiado largo"),
  street_number: z.coerce
    .number({ message: "Debe ser un número" })
    .int("Debe ser un número entero")
    .positive("Debe ser un número positivo")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  id_type: z.coerce
    .number({ message: "Selecciona un tipo de reporte" })
    .min(1, "Selecciona un tipo de reporte"),
  image: z.any().optional(),
});

export type CreateReportForm = z.infer<typeof createReportSchema>;
