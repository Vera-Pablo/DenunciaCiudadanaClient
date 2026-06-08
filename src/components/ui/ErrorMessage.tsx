import React from "react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Error al cargar",
  message = "Por favor, intenta nuevamente más tarde.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <span className="material-symbols-outlined text-error text-5xl mb-4">
        error
      </span>
      <h2 className="text-xl font-bold text-on-surface mb-2">{title}</h2>
      <p className="text-on-surface-variant max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 px-6 py-2 bg-primary text-on-primary rounded-full font-semibold hover:bg-primary/90 transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
