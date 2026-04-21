import React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
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

      <form className="flex flex-col gap-8">
        <Input
          label="Nombre completo"
          type="text"
          placeholder="Juan Pérez"
          required
          id="name"
        />
        <Input
          label="DNI"
          type="number"
          placeholder="12345678"
          required
          id="dni"
        />
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="nombre@ejemplo.com"
          required
          id="email"
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          required
          id="password"
        />

        <div className="mt-8 flex flex-col gap-5">
          <Button type="submit" fullWidth icon>
            Registrarse
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
