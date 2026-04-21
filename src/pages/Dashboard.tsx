import React from "react";
import Button from "../components/ui/Button";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <section className="max-w-2xl">
        <h2 className="text-[2.75rem] leading-[1.1] font-headline font-light tracking-tight text-on-surface mb-4">
          ¿En qué podemos ayudarte hoy?
        </h2>
        <p className="text-lg text-on-surface-variant">
          Selecciona una opción para comenzar a gestionar tus reportes o acceder
          a servicios ciudadanos.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-8 rounded-[2rem] flex flex-col gap-6 shadow-sm border border-outline-variant/10">
          <div className="w-16 h-16 bg-primary-container/30 rounded-2xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">add_circle</span>
          </div>
          <div>
            <h3 className="text-2xl font-headline font-medium text-on-surface mb-2">
              Generar Denuncia
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Inicia un nuevo reporte ciudadano. Proporciona detalles, ubicación
              y evidencia fotográfica para su pronta atención.
            </p>
          </div>
          <Button variant="primary" className="self-start" icon>
            Comenzar
          </Button>
        </div>

        <div className="bg-surface-container-low p-8 rounded-[2rem] flex flex-col gap-6 shadow-sm border border-outline-variant/10">
          <div className="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-3xl">folder_open</span>
          </div>
          <div>
            <h3 className="text-2xl font-headline font-medium text-on-surface mb-2">
              Mis Denuncias
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Consulta el estado y seguimiento de los reportes que has realizado
              anteriormente.
            </p>
          </div>
          <Button variant="secondary" className="self-start">
            Ver Historial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
