import React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
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

      <form className="flex flex-col gap-8">
        <Input
          label="Dirección de correo electrónico"
          type="email"
          placeholder="nombre@ejemplo.com"
          required
          id="email"
        />

        <div className="flex flex-col gap-2">
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            required
            id="password"
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

        <div className="mt-8 flex flex-col gap-5">
          <Button type="submit" fullWidth icon>
            Ingresar
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
