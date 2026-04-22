import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const loginSchema = z.object({
  email: z.email("Por favor, ingrese un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await login(data);
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Error al iniciar sesión. Verifique sus credenciales.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center w-full max-w-md mx-auto pt-8 pb-12">
      <div className="mb-14 text-center">
        <h2 className="text-4xl leading-tight font-headline font-semibold text-on-surface mb-4">
          Bienvenido de nuevo
        </h2>
        <p className="text-lg font-body text-on-surface-variant">
          Inicia sesión para continuar accediendo a los servicios ciudadanos.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <Input
          label="Dirección de correo electrónico"
          type="email"
          placeholder="nombre@ejemplo.com"
          id="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="flex flex-col gap-2">
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            id="password"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="flex justify-end mt-2 pr-2">
            <Link
              to="#"
              className="text-sm font-label text-primary hover:text-primary-container transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 text-error text-sm p-4 rounded-2xl text-center">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-5">
          <Button type="submit" fullWidth icon disabled={isSubmitting}>
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
          <Link
            to="/register"
            className="w-full text-center py-4 font-headline text-base font-medium text-primary hover:bg-surface-container-low rounded-full transition-all"
          >
            Crear cuenta
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
