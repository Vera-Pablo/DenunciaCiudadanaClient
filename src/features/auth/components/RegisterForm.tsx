import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../index";
import { registerSchema, type RegisterFormValues } from "../schemas/auth.schema";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const RegisterForm: React.FC = () => {
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
      const { confirmPassword: _, dni, ...rest } = data;
      const payload = {
        ...rest,
        dni: Number(dni),
      };

      await authService.register(payload);

      navigate("/login", {
        state: {
          registered: true,
          message:
            "¡Cuenta creada con éxito! Ahora puedes iniciar sesión con tus credenciales.",
        },
      });
    } catch (err: any) {
      const message = err.response?.data?.message || "";
      if (err.response?.status === 409 || message.includes("already exists")) {
        if (message.toLowerCase().includes("email")) {
          setError("Este correo electrónico ya está registrado.");
        } else if (message.toLowerCase().includes("dni")) {
          setError("Este DNI ya se encuentra en nuestra base de datos.");
        } else {
          setError(
            "Los datos ingresados ya corresponden a una cuenta existente.",
          );
        }
      } else {
        setError(
          "Error al crear la cuenta. Verifique que todos los campos sean correctos.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <Input
        label="Nombre completo"
        placeholder="Juan Pérez"
        id="name"
        error={errors.name?.message}
        {...register("name")}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          label="DNI"
          placeholder="12345678"
          id="dni"
          error={errors.dni?.message}
          {...register("dni")}
        />
        <Input
          label="Teléfono"
          placeholder="3794123456"
          id="telefono"
          error={errors.telefono?.message}
          {...register("telefono")}
        />
      </div>
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
      <Input
        label="Confirmar contraseña"
        type="password"
        placeholder="••••••••"
        id="confirmPassword"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
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
  );
};

export default RegisterForm;
