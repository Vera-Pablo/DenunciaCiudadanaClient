import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useResetPassword } from "../features/auth/api/useResetPassword";
import { toast } from "sonner";


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { mutate, isPending, isError, error } = useResetPassword();

  if(!token){
    return(
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-error mb-4">Enlace inválido</h2>
        <p className="text-on-surface-variant mb-6">No se encontró el token de seguridad. Por favor, solicita un nuevo enlace de recuperación.</p>
        <Link to="/login" className="text-primary font-medium hover:underline">Volver al inicio de sesión</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");

        if (newPassword !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden");
        return;
        }

        if (newPassword.length < 6) {
        setPasswordError("La contraseña debe tener al menos 6 caracteres");
        return;
        }

        mutate(
        { token, newPassword },
        {
            onSuccess: () => {
            toast.success("¡Contraseña actualizada!", {
                description: "Tu contraseña se ha cambiado exitosamente.",
            });
            // Redirigimos al login pasándole un mensaje de éxito para que lo muestre arriba (igual que en Register)
            navigate("/login", { 
                state: { message: "¡Tu contraseña se ha restablecido! Inicia sesión con tu nueva clave." } 
            });
            },
        }
        );
    }; 

    return (
    <div className="min-h-screen bg-[#fcf9f6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#e6dcd1] p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#c57b57] mb-2">
            Crear Nueva Contraseña
          </h1>
          <p className="text-[#857a70] text-sm">
            Ingresa tu nueva contraseña a continuación.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nueva Contraseña"
            type="password"
            placeholder="••••••••"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={passwordError}
          />
          {isError && (
            <div className="bg-error/10 border border-error/20 text-error text-sm p-4 rounded-xl text-center">
              {(error as any)?.response?.data?.message || "El enlace ha expirado o es inválido."}
            </div>
          )}
          <Button type="submit" fullWidth disabled={isPending || !newPassword || !confirmPassword}>
            {isPending ? "Actualizando..." : "Restablecer Contraseña"}
          </Button>
        </form>
      </div>
    </div>
  );
}; 

export default ResetPassword;