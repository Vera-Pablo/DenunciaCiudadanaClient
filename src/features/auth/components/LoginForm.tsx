import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../index";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schema";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const successMessage = location.state?.message;

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {successMessage && (
        <div className="bg-success/10 border border-success/20 text-success text-sm p-4 rounded-2xl text-center font-medium animate-in fade-in slide-in-from-top-2 duration-500">
          {successMessage}
        </div>
      )}

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
  );
};

export default LoginForm;
