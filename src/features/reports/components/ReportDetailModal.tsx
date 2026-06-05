import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Report } from "../types";
import { useStatuses } from "../hooks/useStatuses";
import { useUpdateReportStatus } from "../hooks/useUpdateReportStatus";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import Badge from "../../../components/ui/Badge";
import {
  MdClose,
  MdLocationOn,
  MdPerson,
  MdCalendarToday,
  MdChat,
} from "react-icons/md";
import { getStatusVariant, getStatusLabel } from "../utils/statusHelpers";



const getSchema = (finalizadoId?: number) =>
  z
    .object({
      id_status: z.coerce.number().min(1, "Debe seleccionar un estado"),
      resolution_text: z.string().optional(),
    })
    .refine(
      (data) => {
        if (
          data.id_status === finalizadoId &&
          (!data.resolution_text || data.resolution_text.trim().length < 10)
        ) {
          return false;
        }
        return true;
      },
      {
        message:
          "La resolución oficial es obligatoria (mín. 10 carac.) para marcar como Resuelta",
        path: ["resolution_text"],
      },
    );

interface ReportDetailModalProps {
  report: Report;
  onClose: () => void;
  onOpenChat: () => void;
}

const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  onClose,
  onOpenChat,
}) => {
  const { data: statuses } = useStatuses();
  const finalizadoStatus = statuses?.find(
    (s) => s.type_status.toLowerCase() === "finalizado",
  );
  const updateMutation = useUpdateReportStatus(report.id_report);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getSchema(finalizadoStatus?.id_status)),
    defaultValues: {
      id_status: report.id_status,
      resolution_text: "",
    },
  });

  const selectedStatusId = watch("id_status");
  const isFinalizado = Number(selectedStatusId) === finalizadoStatus?.id_status;

  const onSubmit = async (data: any) => {
    try {
      await updateMutation.mutateAsync(data);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-surface w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row transition-all animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 z-[110] p-2 bg-surface/80 backdrop-blur-md rounded-full shadow-sm text-on-surface-variant hover:text-on-surface"
        >
          <MdClose size={24} />
        </button>

        <div className="flex flex-col md:flex-row w-full overflow-y-auto md:overflow-hidden">
          <div className="w-full md:w-1/2 bg-surface-container-low p-5 md:p-8 md:overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-outline-variant/10">
            <div className="flex justify-between items-start mb-6 pr-10 md:pr-0">
              <Badge variant={getStatusVariant(report.status.type_status)}>
                {getStatusLabel(report.status.type_status)}
              </Badge>
              <span className="text-[10px] md:text-xs font-mono text-on-surface-variant font-medium">
                #{report.tracking_num}
              </span>
            </div>

            <div className="rounded-xl md:rounded-2xl overflow-hidden mb-6 aspect-video bg-surface-container-highest shadow-inner flex items-center justify-center">
              {report.img_url ? (
                <img
                  src={report.img_url}
                  alt="Evidencias"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-on-surface-variant/40">
                  <span className="material-symbols-outlined text-5xl">
                    image_not_supported
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest">
                    Sin evidencia fotográfica
                  </span>
                </div>
              )}
            </div>

            <h2 className="text-xl md:text-2xl font-headline font-semibold text-on-surface mb-4">
              {report.type.type}
            </h2>

            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 bg-surface-container-lowest/50 p-4 rounded-xl border border-outline-variant/10">
              {report.description}
            </p>

            <div className="space-y-3 pt-6 border-t border-outline-variant/10">
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <div className="w-8 h-8 rounded-lg bg-primary-container/30 flex items-center justify-center text-primary shrink-0">
                  <MdLocationOn size={18} />
                </div>
                <span className="font-medium truncate">
                  {report.street} {report.street_number}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <div className="w-8 h-8 rounded-lg bg-primary-container/30 flex items-center justify-center text-primary shrink-0">
                  <MdPerson size={18} />
                </div>
                <span className="font-medium truncate">
                  {report.user?.name || "Anónimo"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <div className="w-8 h-8 rounded-lg bg-primary-container/30 flex items-center justify-center text-primary shrink-0">
                  <MdCalendarToday size={16} />
                </div>
                <span className="font-medium">
                  {new Date(report.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col bg-surface overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg md:text-xl font-headline font-semibold text-on-surface">
                Gestión de Denuncia
              </h3>
              <button
                onClick={onClose}
                className="hidden md:flex p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
              >
                <MdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Controller
                name="id_status"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Actualizar Estado"
                    options={
                      statuses?.map((s) => ({
                        value: s.id_status,
                        label: getStatusLabel(s.type_status),
                      })) || []
                    }
                    error={errors.id_status?.message}
                    value={field.value as number}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />

              <div
                className={`transition-all duration-500 transform ${isFinalizado
                    ? "opacity-100 translate-y-0"
                    : "opacity-60 translate-y-1"
                  }`}
              >
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-xs font-label text-on-surface-variant uppercase tracking-widest pl-2 font-medium">
                    Resolución Oficial{" "}
                    {isFinalizado && <span className="text-error">*</span>}
                  </label>
                  <textarea
                    className={`
                      w-full bg-surface-container-low border-0 outline-none
                      rounded-[1.5rem] px-5 py-4 text-on-surface font-body 
                      transition-all placeholder:text-on-surface-variant/50 
                      shadow-sm focus:ring-2 focus:ring-primary/50 min-h-[140px] md:min-h-[160px] resize-none
                      ${errors.resolution_text ? "ring-2 ring-error/50" : ""}
                    `}
                    placeholder="Describe las acciones tomadas..."
                    {...register("resolution_text")}
                  />
                  {errors.resolution_text && (
                    <span className="text-xs text-error px-2 font-medium">
                      {errors.resolution_text.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 md:pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={updateMutation.isPending}
                  className="!rounded-2xl py-4"
                >
                  Guardar Cambios
                </Button>
              </div>
            </form>

            <p className="text-[10px] text-center text-on-surface-variant mt-8 italic">
              Al marcar como "Resuelta", se enviará una notificación automática
              al ciudadano.
            </p>

            <div className="pt-6 mt-4 border-t border-outline-variant/10">
              <button
                type="button"
                onClick={onOpenChat}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-primary hover:bg-primary/90 text-on-primary font-semibold rounded-2xl transition-colors shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <MdChat size={20} />
                Ir al Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReportDetailModal };
