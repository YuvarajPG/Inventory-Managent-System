import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ProductType from "../../../../types/Product";

interface DeleteModalModernProps {
  product?: ProductType | null;
  productName?: string;
  open?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteModalModern: React.FC<DeleteModalModernProps> = ({
  product,
  productName,
  open,
  onCancel,
  onConfirm,
}) => {
  const isVisible = open !== undefined ? open : Boolean(product);
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogBoxRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (isVisible && dialogBoxRef.current && backdropRef.current) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );

      gsap.fromTo(
        dialogBoxRef.current,
        { opacity: 0, scale: 0.96, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: "power2.out" }
      );
    }
  }, [isVisible]);

  // Smooth exit
  const handleAnimatedCancel = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !dialogBoxRef.current || !backdropRef.current) {
      onCancel();
      return;
    }

    gsap.to(dialogBoxRef.current, {
      opacity: 0,
      scale: 0.97,
      y: 6,
      duration: 0.16,
      ease: "power2.in",
    });

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.16,
      ease: "power2.in",
      onComplete: onCancel,
    });
  };

  // Keyboard shortcut: Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleAnimatedCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  const displayName = product?.name || productName || "this item";
  const displayBrand = product?.brand ? ` (${product.brand})` : "";

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modern-delete-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs"
    >
      <div
        ref={dialogBoxRef}
        className="bg-white border border-slate-300 rounded-md max-w-sm w-full p-4 shadow-lg relative"
      >
        <h3 id="modern-delete-dialog-title" className="text-sm font-semibold text-slate-900">
          Confirm Deletion
        </h3>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Are you sure you want to delete <strong className="text-slate-900 font-semibold">{displayName}</strong>{displayBrand}? This will remove the item from inventory records.
        </p>

        <div className="flex items-center justify-end gap-2 mt-4 pt-2.5 border-t border-slate-100">
          <button
            type="button"
            onClick={handleAnimatedCancel}
            className="px-3 py-1.5 rounded text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-3.5 py-1.5 rounded text-xs font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors cursor-pointer shadow-2xs"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalModern;
