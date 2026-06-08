import React from "react";
import { MdContactPhone, MdPhone, MdOpenInNew } from "react-icons/md";

interface ContactEntry {
  name: string;
  number: string;
  description: string;
  icon: string;
  gradient: string;
  bgColor: string;
  iconBg: string;
}

const contacts: ContactEntry[] = [
  {
    name: "Bomberos",
    number: "100",
    description: "Emergencias con incendios, rescates y siniestros.",
    icon: "🔥",
    gradient: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    iconBg: "bg-red-100 text-red-600",
  },
  {
    name: "Policía",
    number: "101",
    description: "Denuncias, seguridad ciudadana y emergencias policiales.",
    icon: "🚔",
    gradient: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    name: "Emergencias Médicas",
    number: "107",
    description: "Ambulancias, urgencias médicas y traslados.",
    icon: "🚑",
    gradient: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    name: "Defensa Civil",
    number: "103",
    description: "Inundaciones, derrumbes y catástrofes naturales.",
    icon: "🛟",
    gradient: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconBg: "bg-orange-100 text-orange-600",
  },
  {
    name: "Servicio Eléctrico",
    number: "0800-444-2767",
    description: "Cortes de luz, cables caídos y emergencias eléctricas.",
    icon: "⚡",
    gradient: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    name: "Violencia de Género",
    number: "137",
    description: "Atención a víctimas de violencia familiar y de género.",
    icon: "🛡️",
    gradient: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-50",
    iconBg: "bg-violet-100 text-violet-600",
  },
];

const Contacts: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <MdContactPhone size={22} />
        </div>
        <h1 className="text-2xl md:text-3xl font-headline font-semibold text-on-surface">
          Contactos de Emergencia
        </h1>
      </div>

      <p className="text-on-surface-variant max-w-2xl">
        Números de contacto ante emergencias y servicios públicos. Hacé clic en
        el número para llamar directamente desde tu dispositivo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contacts.map((c) => (
          <a
            key={c.name}
            href={`tel:${c.number.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block ${c.bgColor} border border-outline-variant/10 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 no-underline`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${c.iconBg} group-hover:scale-110 transition-transform duration-300`}
              >
                {c.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-headline font-semibold text-on-surface">
                  {c.name}
                </h3>
                <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                  {c.description}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${c.gradient} shadow-sm group-hover:shadow-md transition-all`}
                  >
                    <MdPhone size={16} />
                    {c.number}
                  </div>
                  <MdOpenInNew
                    size={16}
                    className="text-on-surface-variant/40 group-hover:text-on-surface-variant transition-colors"
                  />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
