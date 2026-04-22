import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const registerSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  dni: z.string().min(7, "DNI inválido").max(10, "DNI demasiado largo"),
  email: z.email("Por favor, ingrese un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await authService.register(data);
      navigate("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Error al crear la cuenta. Intente con otro correo o DNI.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center w-full max-w-md mx-auto pt-8 pb-12">
      <div className="mb-14 text-center">
        <h2 className="text-4xl leading-tight font-headline font-semibold text-on-surface mb-4">
          Únete a nosotros
        </h2>
        <p className="text-lg font-body text-on-surface-variant">
          Crea una cuenta ciudadana para empezar a reportar incidentes.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <Input
          label="Nombre completo"
          placeholder="Juan Pérez"
          id="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="DNI"
          placeholder="12345678"
          id="dni"
          error={errors.dni?.message}
          {...register("dni")}
        />
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="nombre@ejemplo.com"
          id="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          id="password"
          error={errors.password?.message}
          {...register("password")}
        />

        {error && (
          <div className="bg-error/10 border border-error/20 text-error text-sm p-4 rounded-2xl text-center">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-5">
          <Button type="submit" fullWidth icon disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </Button>
          <Link
            to="/login"
            className="w-full text-center py-4 font-headline text-base font-medium text-primary hover:bg-surface-container-low rounded-full transition-all"
          >
            Ya tengo una cuenta
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
