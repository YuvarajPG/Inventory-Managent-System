import React, { useEffect } from "react";
import ProductType from "../../../types/Product";

interface DeleteModalProps {
  product?: ProductType | null;
  productName?: string;
  open?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  product,
  productName,
  open,
  onCancel,
  onConfirm,
}) => {
  const isVisible = open !== undefined ? open : Boolean(product);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, onCancel]);

  if (!isVisible) return null;

  const displayName = product?.name || productName || "this item";
  const displayBrand = product?.brand ? ` (${product.brand})` : "";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs"
    >
      <div className="bg-white border border-slate-300 rounded max-w-sm w-full p-4 shadow-md relative">
        <h3 id="delete-dialog-title" className="text-sm font-semibold text-slate-900">
          Confirm Deletion
        </h3>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Are you sure you want to delete <strong className="text-slate-900 font-semibold">{displayName}</strong>{displayBrand}? This will remove the item from active inventory records.
        </p>

        <div className="flex items-center justify-end gap-2 mt-4 pt-2.5 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-3 py-1.5 rounded text-xs font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors cursor-pointer shadow-2xs"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
