import React, { useEffect } from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  // Show at most the 3 most recent toasts to prevent screen obstruction
  const visibleToasts = toasts.slice(-3);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-1.5 max-w-xs w-full pointer-events-none"
    >
      {visibleToasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-center justify-between px-3 py-2 rounded-md border shadow-sm text-xs font-medium transition-all ${
        isSuccess
          ? "bg-white border-emerald-300 text-emerald-900"
          : isError
          ? "bg-white border-red-300 text-red-900"
          : "bg-white border-slate-300 text-slate-800"
      }`}
    >
      <div className="flex items-center gap-2 truncate">
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            isSuccess ? "bg-emerald-600" : isError ? "bg-red-600" : "bg-slate-600"
          }`}
        />
        <span className="truncate">{toast.message}</span>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="ml-2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-0.5 shrink-0"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastContainer;
