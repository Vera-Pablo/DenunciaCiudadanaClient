import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createReportSchema,
  type CreateReportForm,
} from "../schemas/report.schema";
import { useReportTypes } from "../hooks/useReportTypes";
import { useCreateReport } from "../hooks/useCreateReport";
import Button from "../../../components/ui/Button";

interface ReportFormProps {
  onSuccess: (data: { tracking_num: string }) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSuccess }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateReportForm>({
    resolver: zodResolver(createReportSchema) as any,
  });

  const selectedImage = watch("image");
  const { data: reportTypes = [], isLoading: isLoadingTypes } =
    useReportTypes();
  const createReportMutation = useCreateReport();

  useEffect(() => {
    if (selectedImage && selectedImage.length > 0) {
      const file = selectedImage[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [selectedImage]);

  const onSubmit = (data: CreateReportForm) => {
    createReportMutation.mutate(data, {
      onSuccess: (result) => {
        onSuccess(result);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-on-surface px-4">
            Tipo de Incidencia
          </label>
          <div className="relative">
            <select
              disabled={isLoadingTypes}
              {...register("id_type")}
              className={`w-full bg-surface-container-high rounded-[1.25rem] py-4 px-6 border-none text-on-surface appearance-none focus:ring-2 focus:ring-primary/20 transition-all ${
                errors.id_type ? "ring-2 ring-error/20" : ""
              }`}
            >
              <option value="">
                {isLoadingTypes ? "Cargando tipos..." : "Selecciona un tipo..."}
              </option>
              {reportTypes.map((type) => (
                <option key={type.id_type} value={type.id_type}>
                  {type.type}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
              expand_more
            </span>
          </div>
          {errors.id_type && (
            <p className="text-error text-xs font-medium px-4">
              {errors.id_type.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium text-on-surface px-4">
              Calle
            </label>
            <input
              type="text"
              placeholder="Ej: Av. 9 de Julio"
              {...register("street")}
              className={`w-full bg-surface-container-high rounded-[1.25rem] py-4 px-6 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all border-none ${
                errors.street ? "ring-2 ring-error/20" : ""
              }`}
            />
            {errors.street && (
              <p className="text-error text-xs font-medium px-4">
                {errors.street.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface px-4">
              Altura
            </label>
            <input
              type="number"
              placeholder="1234"
              {...register("street_number")}
              className={`w-full bg-surface-container-high rounded-[1.25rem] py-4 px-6 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all border-none ${
                errors.street_number ? "ring-2 ring-error/20" : ""
              }`}
            />
            {errors.street_number && (
              <p className="text-error text-xs font-medium px-4">
                {errors.street_number.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-on-surface px-4">
            Descripción de los hechos
          </label>
          <textarea
            rows={4}
            placeholder="Describe lo que está sucediendo con el mayor detalle posible..."
            {...register("description")}
            className={`w-full bg-surface-container-high rounded-[1.25rem] py-4 px-6 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all border-none resize-none ${
              errors.description ? "ring-2 ring-error/20" : ""
            }`}
          />
          {errors.description && (
            <p className="text-error text-xs font-medium px-4">
              {errors.description.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-on-surface px-4">
            Evidencia Fotográfica (Opcional)
          </label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-[1.25rem] p-8 hover:bg-surface-container-high/50 transition-all group relative overflow-hidden">
            {preview ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
                    Cambiar Imagen
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">
                    add_a_photo
                  </span>
                </div>
                <p className="text-on-surface font-medium capitalize">
                  Haz clic para subir una foto
                </p>
                <p className="text-on-surface-variant text-xs mt-1">
                  PNG, JPG hasta 5MB
                </p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          {errors.image && (
            <p className="text-error text-xs font-medium px-4 mt-2">
              {errors.image.message as string}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={createReportMutation.isPending}
        className="py-5"
      >
        {createReportMutation.isPending ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Cargando Denuncia...</span>
          </div>
        ) : (
          "Enviar Denuncia"
        )}
      </Button>

      {createReportMutation.isError && (
        <p className="text-error text-center mt-4 font-medium animate-bounce">
          Hubo un error al enviar la denuncia. Por favor inténtalo de nuevo.
        </p>
      )}
    </form>
  );
};

export { ReportForm };
