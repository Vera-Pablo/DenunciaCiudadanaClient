import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useForgotPassword } from "../api/useForgotPassword";
import { toast } from "sonner"; 

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const { mutate, isPending, reset } = useForgotPassword();

  if (!isOpen) return null;

  const handleClose = () => {
    reset(); 
    setEmail("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("¡Enlace enviado!", {
            description: "En breve recibirás instrucciones para restablecer tu contraseña.",
            duration: 5000,
          });
          handleClose(); 
        },
        onError: (error: any) => {
          toast.error("Ocurrió un error", {
            description: error.response?.data?.message || "No se pudo enviar el enlace. Intenta de nuevo.",
          });
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8 mt-2">
          <h2 className="text-2xl font-headline font-bold text-primary mb-2">Recuperar Contraseña</h2>
          <p className="text-on-surface-variant text-sm">
            Ingresa tu correo y te enviaremos un enlace seguro para restablecerla.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Dirección de correo electrónico"
            type="email"
            placeholder="nombre@ejemplo.com"
            id="reset-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" fullWidth disabled={isPending || !email}>
            {isPending ? "Enviando..." : "Enviar enlace"}
          </Button>
        </form>
        
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
