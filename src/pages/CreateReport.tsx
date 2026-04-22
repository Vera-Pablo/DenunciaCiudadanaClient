import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReportForm from "../features/reports/components/ReportForm";
import Button from "../components/ui/Button";

const CreateReport: React.FC = () => {
  const [successData, setSuccessData] = useState<{ tracking_num: string } | null>(null);

  if (successData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8">
          <span className="material-symbols-outlined text-6xl">
            check_circle
          </span>
        </div>
        <h2 className="text-4xl font-headline font-light text-on-surface mb-2">
          Denuncia Cargada con Éxito
        </h2>
        <p className="text-on-surface-variant mb-10 max-w-md">
          Tu reporte ha sido registrado en nuestro sistema. Guarda el siguiente
          número para realizar el seguimiento.
        </p>

        <div className="bg-surface-container-high px-8 py-6 rounded-3xl mb-12 border border-outline-variant/30">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-1">
            Número de Seguimiento
          </span>
          <span className="text-3xl font-mono font-bold text-primary tracking-wider">
            {successData.tracking_num}
          </span>
        </div>

        <Link to="/">
          <Button variant="primary">Volver al Inicio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 pb-20">
      <div className="mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 group"
        >
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform tracking-tight">
            arrow_back
          </span>
          <span className="font-headline font-medium">Volver</span>
        </Link>
        <h1 className="text-4xl font-headline font-light text-on-surface">
          Nueva Denuncia
        </h1>
        <p className="text-on-surface-variant mt-2 text-lg">
          Completa los detalles de la incidencia para que las autoridades puedan
          intervenir.
        </p>
      </div>

      <ReportForm onSuccess={setSuccessData} />
    </div>
  );
};

export default CreateReport;
