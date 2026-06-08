import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { MdArrowBack } from "react-icons/md";
import { useProfile } from "../features/auth/hooks/useProfile";
import { useUpdateProfile } from "../features/auth/hooks/useUpdateProfile";
import { useAuth } from "../features/auth";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(50),
  telefono: z.string().min(7, "El teléfono debe tener al menos 7 caracteres").max(15),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const { data: profile, isLoading, isError, refetch } = useProfile();
  const mutation = useUpdateProfile();
  const { updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      name: profile?.name ?? "",
      telefono: profile?.telefono ?? "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await mutation.mutateAsync(data);
      updateUser({ name: data.name });
      toast.success("Perfil actualizado", {
        description: "Tus datos se guardaron correctamente.",
      });
    } catch (error: any) {
      toast.error("Error al guardar", {
        description: error?.response?.data?.message || "No se pudieron guardar los cambios.",
      });
    }
  };

  if (isLoading) return <LoadingSpinner size="lg" />;

  if (isError) {
    return (
      <ErrorMessage
        title="Error al cargar tu perfil"
        message="No se pudo obtener tu información. Verifica tu conexión e intenta de nuevo."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <main className="w-full px-6 pt-8 pb-24 max-w-2xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface mb-8 transition-colors"
      >
        <MdArrowBack size={18} />
        Volver
      </Link>

      <h1 className="text-2xl md:text-3xl font-headline font-semibold text-on-surface mb-8">
        Mi Perfil
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="DNI"
          value={profile?.dni ?? ""}
          disabled
          className="bg-surface-container-highest/50 text-on-surface-variant cursor-not-allowed"
        />

        <Input
          label="Email"
          value={profile?.email ?? ""}
          disabled
          className="bg-surface-container-highest/50 text-on-surface-variant cursor-not-allowed"
        />

        <Input
          label="Nombre"
          id="name"
          placeholder="Tu nombre completo"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Teléfono"
          id="telefono"
          placeholder="Tu número de teléfono"
          error={errors.telefono?.message}
          {...register("telefono")}
        />

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={mutation.isPending}
            disabled={!isDirty}
          >
            Guardar Cambios
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Profile;
