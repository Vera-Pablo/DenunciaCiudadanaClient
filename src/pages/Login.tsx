import React from "react";
import LoginForm from "../features/auth/components/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col justify-center w-full max-w-md mx-auto pt-8 pb-12">
      <div className="mb-14 text-center">
        <h2 className="text-4xl leading-tight font-headline font-semibold text-on-surface mb-4">
          Bienvenido
        </h2>
        <p className="text-lg font-body text-on-surface-variant">
          Inicia sesión para continuar accediendo a los servicios ciudadanos.
        </p>
      </div>

      <LoginForm />
    </div>
  );
};

export default Login;
