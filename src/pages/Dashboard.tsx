import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../features/auth";

const Dashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const isAuthority = user?.role.type_role === "Autoridad";

  return (
    <div className="flex flex-col gap-10">
      <section className="max-w-2xl">
        <h2 className="text-[2.75rem] leading-[1.1] font-headline font-light tracking-tight text-on-surface mb-4">
          {isAuthority
            ? `Bienvenido, ${user?.name}`
            : "¿En qué podemos ayudarte hoy?"}
        </h2>
        <p className="text-lg text-on-surface-variant">
          {isAuthority
            ? "Accede a las herramientas de gestión para supervisar y resolver los reportes ciudadanos."
            : "Selecciona una opción para comenzar a gestionar tus reportes o acceder a servicios ciudadanos."}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isAuthority ? (
          <div className="bg-primary-container p-8 rounded-[2rem] flex flex-col gap-6 shadow-sm border border-primary/10">
            <div className="w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">
                admin_panel_settings
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-medium text-on-primary-container mb-2">
                Panel de Gestión
              </h3>
              <p className="text-on-primary-container/80 text-sm leading-relaxed">
                Supervisa el listado completo de denuncias, filtra por estado y
                emite resoluciones oficiales.
              </p>
            </div>
            <Link to="/admin" className="self-start">
              <Button variant="primary" className="!bg-on-primary-container !text-primary-container">
                Ver Reportes
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-surface-container-low p-8 rounded-[2rem] flex flex-col gap-6 shadow-sm border border-outline-variant/10">
              <div className="w-16 h-16 bg-primary-container/30 rounded-2xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">
                  add_circle
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-headline font-medium text-on-surface mb-2">
                  Generar Denuncia
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Inicia un nuevo reporte ciudadano. Proporciona detalles,
                  ubicación y evidencia fotográfica para su pronta atención.
                </p>
              </div>
              <Link to="/reports/new" className="self-start">
                <Button variant="primary" icon>
                  Comenzar
                </Button>
              </Link>
            </div>

            <div className="bg-surface-container-low p-8 rounded-[2rem] flex flex-col gap-6 shadow-sm border border-outline-variant/10">
              <div className="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-3xl">
                  folder_open
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-headline font-medium text-on-surface mb-2">
                  Mis Denuncias
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Consulta el estado y seguimiento de los reportes que has
                  realizado anteriormente.
                </p>
              </div>
              <Button variant="secondary" className="self-start">
                Ver Historial
              </Button>
            </div>
          </>
        )}

        <button
          onClick={logout}
          className={`${
            isAuthority ? "md:col-span-1" : "md:col-span-2"
          } group bg-transparent p-6 rounded-[2rem] flex items-center justify-between border border-outline-variant/20 transition-colors duration-300 hover:bg-surface-container-low text-left w-full`}
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-surface-container-highest text-on-surface-variant rounded-2xl flex items-center justify-center group-hover:bg-primary-container/20 group-hover:text-primary transition-colors duration-300">
              <span className="material-symbols-outlined">logout</span>
            </div>
            <div>
              <h3 className="text-lg font-headline font-medium text-on-surface">
                Cerrar Sesión
              </h3>
              <p className="text-on-surface-variant text-xs mt-1">
                Finalizar tu sesión de forma segura.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
