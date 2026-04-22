import React from "react";
import RegisterForm from "../features/auth/components/RegisterForm";

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

      <RegisterForm />
    </div>
  );
};

export default Register;
