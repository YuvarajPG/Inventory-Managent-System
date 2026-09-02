import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastModernProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastModernContainer: React.FC<ToastModernProps> = ({ toasts, onDismiss }) => {
  const visibleToasts = toasts.slice(-3);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-1.5 max-w-xs w-full pointer-events-none"
    >
      {visibleToasts.map((toast) => (
        <ToastModernItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastModernItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  // GSAP entrance
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !itemRef.current) return;

    gsap.fromTo(
      itemRef.current,
      { opacity: 0, y: 10, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" }
    );
  }, []);

  const handleDismiss = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !itemRef.current) {
      onDismiss(toast.id);
      return;
    }

    gsap.to(itemRef.current, {
      opacity: 0,
      y: 4,
      scale: 0.98,
      duration: 0.16,
      ease: "power2.in",
      onComplete: () => onDismiss(toast.id),
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast.id]);

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div
      ref={itemRef}
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
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        className="ml-2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-0.5 shrink-0"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastModernContainer;
